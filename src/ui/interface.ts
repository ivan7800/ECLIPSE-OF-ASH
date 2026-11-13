import { tools } from '../data/catalog';
import { weapons } from '../data/weapons';
import { endings, questDefs, type Ending } from '../data/story';
import type { Game } from '../core/game';
import type { Slot } from '../saves/store';
import { bindings, keyName, type Action, type Input } from '../input/controls';
import { keepSettings, type Settings } from './settings';
import { touchControls } from './touch';
import { mapHtml } from './map';
import { markup } from './markup';

const button=(action:string,label:string,extra='')=>`<button type="button" data-action="${action}" ${extra}>${label}</button>`;
const title=(name:string,eyebrow='Eclipse of Ash 404')=>`<p class="eyebrow">${eyebrow}</p><h2 id="panel-title">${name}</h2>`;
const close=()=>button('close','Volver');
const actions:Record<Action,string>={up:'Arriba',down:'Abajo',left:'Izquierda',right:'Derecha',run:'Correr',attack:'Atacar / cargar',
  block:'Bloquear',dodge:'Esquivar',tool:'Herramienta',use:'Interactuar',shift:'Cambiar de realidad',heal:'Tomar tónico',
  pause:'Pausa',inventory:'Inventario',map:'Mapa',journal:'Diario'};

interface Callbacks {
  start:(slot:number,state:Slot['state'])=>void;
  slots:()=>Promise<Slot[]>;
  save:()=>Promise<void>;
  import:(slot:number,file:File)=>Promise<void>;
  export:(slot:number)=>Promise<void>;
  remove:(slot:number)=>Promise<void>;
  menu:()=>void;
  settings:()=>void;
  respawn:()=>void;
  unlock:()=>void;
}

export class Interface {
  readonly canvas:HTMLCanvasElement;
  readonly numbers:HTMLElement;
  readonly dialog:HTMLDialogElement;
  private body:HTMLElement;
  private mode='';
  private toastTimer=0;
  private saveTimer=0;
  private lastHud='';
  private buttonsHeld=new Set<number>();
  private closeTarget:HTMLElement|null=null;
  private game:Game|null=null;
  private input!:Input;
  private callbacks!:Callbacks;
  private currentSlot=0;
  private notification='';
  private slotsMode:'new'|'continue'='continue';
  private returnToPause=false;
  private $=<T extends HTMLElement=HTMLElement>(id:string)=>this.root.querySelector<T>('#'+id)!;

  constructor(private root:HTMLElement,private settings:Settings) {
    root.innerHTML=markup;
    this.canvas=this.$<HTMLCanvasElement>('scene');
    this.numbers=this.$('numbers');
    this.dialog=this.$<HTMLDialogElement>('panel');
    this.body=this.$('panel-body');
  }

  connect(input:Input,callbacks:Callbacks) {
    this.input=input;this.callbacks=callbacks;
    touchControls(this.$('touch'),input);
    this.root.addEventListener('click',event=>{
      const clicked=(event.target as HTMLElement).closest<HTMLButtonElement>('button');
      if(!clicked) return;
      this.callbacks.unlock();
      if(clicked.dataset.main) this.open(clicked.dataset.main);
      else if(clicked.id==='pause-button') this.open('pause');
      else if(clicked.dataset.action) void this.action(clicked.dataset.action,clicked).catch(error=>this.status(error instanceof Error?error.message:'No se pudo completar la operación.'));
    });
    this.dialog.addEventListener('cancel',event=>{
      event.preventDefault();
      if(!['death','ending','choice'].includes(this.mode)) this.back();
    });
    this.root.addEventListener('pointerdown',()=>this.callbacks.unlock(),{passive:true});
  }

  get paused() {return this.dialog.open;}
  get isMenu() {return this.game===null;}

  enter(game:Game,slot:number) {
    this.game=game;this.currentSlot=slot;this.closePanel();
    this.$('menu').hidden=true;
    this.$('hud').hidden=false;
    this.$('touch').hidden=false;
    this.canvas.tabIndex=0;
    this.canvas.focus({preventScroll:true});
    this.lastHud='';
    this.locationTransition();
  }

  menu() {
    this.game=null;this.currentSlot=0;this.closePanel();
    this.$('menu').hidden=false;
    this.$('hud').hidden=true;
    this.$('touch').hidden=true;
    this.canvas.tabIndex=-1;
    this.root.querySelector<HTMLButtonElement>('[data-main="continue"]')?.focus({preventScroll:true});
  }

  private show(mode:string,html:string,keepScroll=false) {
    const scroll=this.dialog.scrollTop;
    if(!this.dialog.open) this.closeTarget=document.activeElement instanceof HTMLElement?document.activeElement:null;
    this.mode=mode;
    this.input.discardActions();
    this.body.innerHTML=html;
    this.dialog.dataset.panel=mode;
    if(!this.dialog.open) this.dialog.showModal();
    this.dialog.scrollTop=keepScroll?scroll:0;
    this.body.querySelector<HTMLButtonElement>('button:not([disabled])')?.focus({preventScroll:true});
  }

  private closePanel() {
    if(this.dialog.open) this.dialog.close();
    this.mode='';
    this.input?.discardActions();
    if(this.game) this.canvas.focus({preventScroll:true});
    else this.closeTarget?.focus({preventScroll:true});
    this.closeTarget=null;
    this.returnToPause=false;
  }

  private back() {
    if(this.returnToPause && this.game && this.mode!=='pause') {
      this.returnToPause=false;this.open('pause');return;
    }
    this.closePanel();
  }

  dismiss(mode:string) {
    if(this.paused && !['death','ending','choice'].includes(this.mode) && (mode==='pause'||mode===this.mode)) this.back();
  }

  open(mode:string) {
    const game=this.game;
    switch(mode) {
      case 'new':case 'continue':
        this.slotsMode=mode;
        this.show('slots',title('Espacios de guardado')+'<p>Cargando partidas…</p>'+close());
        void this.loadSlots().catch(error=>this.status(error.message));
        break;
      case 'pause':
        if(!game) return;
        this.show('pause',title('En pausa',game.level.name)+`<div class="panel-list">
          ${button('close','Volver al juego')}${button('open:inventory','Inventario y equipo')}${button('open:map','Mapa')}
          ${button('open:journal','Diario')}${button('save','Guardar partida')}${button('export:'+this.currentSlot,'Exportar partida')}
          ${button('open:settings','Configuración')}${button('menu','Guardar y salir al menú')}</div><p data-notice role="status"></p>`);
        break;
      case 'settings':this.settingsPanel();break;
      case 'credits':
        this.show('credits',title('Créditos')+'<p>Diseño, programación, arte pixelado y música originales para ECLIPSE OF ASH 404.</p><p>Motor de escena Three.js. Compilación Vite. Tipografías Instrument Serif y Source Sans 3, bajo SIL OFL.</p>'+close());
        break;
      case 'map':if(game) this.show('map',mapHtml(game).replace('<h2>','<h2 id="panel-title">')+close());break;
      case 'inventory':if(game) this.inventory(game);break;
      case 'journal':if(game) this.journal(game);break;
      case 'shop':case 'smith':if(game) this.shop(mode,game);break;
      case 'death':
        this.show('death',title('La ceniza te reclama')+'<p>Despierta en la entrada de la zona con tu progreso guardado.</p>'+
          button('respawn','Volver a la entrada','class="primary"')+button('menu','Volver al menú'));
        break;
      case 'choice':
        if(game) this.show('choice',title('La última mañana')+'<p>El nombre de tu hermano mantiene abierta la grieta. El altar espera tu decisión.</p>'+
          `<div class="panel-list">${button('finish:dawn','Devolver el alba · Soltar el recuerdo')}${button('finish:keep','Conservar el Reverso · Entregar tu nombre')}
          ${game.canWeave?button('finish:weave','Unir los dos cielos · Leer los nombres'):'<p>Si completas los tres encargos de la aldea, podrás leer los nombres en el altar.</p>'}
          ${close()}</div>`);
        break;
    }
  }

  dialogue(name:string,text:string) {
    this.show('dialogue',title(name,this.game?.level.name)+`<p class="dialogue-text">${text}</p>`+button('close','Continuar','class="primary"'));
  }

  ending(ending:Ending) {
    const value=endings[ending];
    this.show('ending',title(value.title,'Epílogo · Vaeloria')+`<p class="dialogue-text">${value.text}</p>`+
      '<div class="panel-list">'+button('menu','Guardar y volver al menú','class="primary"')+button('close','Volver a Vaeloria')+'</div>');
  }

  private async loadSlots() {
    const slots=await this.callbacks.slots();
    if(this.mode!=='slots') return;
    this.show('slots',title('Espacios de guardado')+`<div class="slots">${slots.map(slot=>{
      const status=slot.state?slot.state.bosses.length+' / 8 recuerdos'+(slot.recovered?' · Copia recuperada':''):slot.corrupt?'Archivo dañado':'Vacío';
      const control=this.slotsMode==='continue' ?
        button('continue:'+slot.slot,'Continuar',slot.state?'':'disabled') :
        button('start:'+slot.slot,slot.state?'Reemplazar':'Empezar','class="primary"');
      return `<article><h3>Partida ${slot.slot}</h3><p>${status}</p><div class="slot-actions">${control}
        ${button('import:'+slot.slot,'Importar')}${slot.state?button('export:'+slot.slot,'Exportar'):''}
        ${slot.state||slot.corrupt?button('delete:'+slot.slot,'Borrar'):''}</div></article>`;
    }).join('')}</div><p data-notice role="status"></p>${close()}`);
    if(this.notification){this.status(this.notification);this.notification='';}
  }

  private inventory(game:Game) {
    const {state}=game;
    this.show('inventory',title('Inventario y equipo')+`<p>Temple +${state.weapon} · Escudo ${state.armor?'reforzado':'de viaje'} · Tónicos: ${state.tonics}</p>
      <h3>Armas</h3><div class="panel-list">${state.foundWeapons.map(index=>button('weapon:'+index,
        '<strong>'+weapons[index].name+'</strong><small>'+weapons[index].description+'</small>',
        index===state.weaponStyle?'class="selected" aria-pressed="true"':'aria-pressed="false"')).join('')}</div>
      <h3>Herramientas</h3><div class="panel-list">${state.tools.length?state.tools.map(index=>button('equip:'+index,
        '<strong>'+tools[index].name+'</strong><small>'+tools[index].description+'</small>',
        index===state.tool?'class="selected" aria-pressed="true"':'aria-pressed="false"')).join(''):'<p>Busca el primer relicario en el Santuario de las Raíces.</p>'}</div>${close()}`);
  }

  private journal(game:Game) {
    this.show('journal',title('Diario')+`<p>${game.objective}</p><h3>Encargos de la aldea</h3><div class="quest-list">${questDefs.map(quest=>{
      const state=game.state.quests[quest.id];
      return `<article><h4>${quest.title}</h4><p>${quest.detail}</p><small>${state==='done'?'Completado':state==='found'?'Objeto recuperado':'Pendiente'}</small></article>`;
    }).join('')}</div>${close()}`);
  }

  private shop(mode:string,game:Game) {
    const {state}=game;
    const previous=this.mode===mode;
    this.show(mode,title(mode==='shop'?'Bastián, comerciante':'Ivara, herrera')+`<p>Tu bolsa contiene ${state.gold} brasas.</p>
      <div class="panel-list">${mode==='shop'?button('buy:tonic','Tónico de vida · 6 brasas'):
        button('buy:weapon',state.weapon===2?'Espada al máximo':'Templar espada · '+(20+state.weapon*14)+' brasas',state.weapon===2?'disabled':'')+
        button('buy:armor',state.armor?'Escudo al máximo':'Reforzar escudo · 25 brasas',state.armor?'disabled':'')}</div>
      <p data-notice role="status"></p>${close()}`,previous);
  }

  private settingsPanel() {
    const value=this.settings;
    const selected=(key:string,current:string)=>key===current?'selected':'';
    const checked=(state:boolean)=>state?'checked':'';
    this.show('settings',title('Configuración')+`<div class="settings-grid">
      <label>Gráficos<select data-setting="quality"><option value="low" ${selected('low',value.quality)}>Bajo</option>
        <option value="medium" ${selected('medium',value.quality)}>Medio</option><option value="high" ${selected('high',value.quality)}>Alto</option></select></label>
      <label>Dificultad<select data-setting="difficulty"><option value="story" ${selected('story',value.difficulty)}>Historia</option>
        <option value="normal" ${selected('normal',value.difficulty)}>Normal</option><option value="hard" ${selected('hard',value.difficulty)}>Difícil</option></select></label>
      <label>Reducir movimiento y destellos<input type="checkbox" data-setting="reduced" ${checked(value.reduced)}></label>
      <label>Alto contraste<input type="checkbox" data-setting="contrast" ${checked(value.contrast)}></label>
      <label>Texto ampliado<input type="checkbox" data-setting="large" ${checked(value.large)}></label>
      ${Object.entries({master:'Volumen general',music:'Música',effects:'Efectos',ambience:'Ambiente'}).map(([key,label])=>
        `<label>${label}<input aria-label="${label}" type="range" min="0" max="1" step=".05" data-volume="${key}" value="${value.volumes[key as keyof typeof value.volumes]}"></label>`).join('')}
      </div><h3>Teclado</h3><div class="binding-grid">${(Object.keys(bindings) as Action[]).map(key=>
        button('bind:'+key,`<span>${actions[key]}</span><kbd>${keyName(value.bindings[key])}</kbd>`)).join('')}</div>
      <p class="small">Mando estándar · X espada, A acción, B esquiva, Y herramienta, LB guardia, RB carrera, LT Reverso, RT tónico, Start pausa.</p>
      <p data-notice role="status"></p>${button('reset-keys','Restablecer teclas')} ${close()}`);
    for(const item of this.body.querySelectorAll<HTMLInputElement|HTMLSelectElement>('[data-setting], [data-volume]')){
      item.addEventListener('input',()=>{
        const name=item.dataset.setting;
        if(item.dataset.volume) value.volumes[item.dataset.volume as keyof typeof value.volumes]=Number(item.value);
        else if(name==='quality') value.quality=item.value as Settings['quality'];
        else if(name==='difficulty') value.difficulty=item.value as Settings['difficulty'];
        else if(item instanceof HTMLInputElement && (name==='contrast'||name==='large'||name==='reduced')) value[name]=item.checked;
        this.refreshSettings();
      });
    }
  }

  private refreshSettings() {
    keepSettings(this.settings);this.callbacks.settings();this.lastHud='';
  }

  private async action(action:string,clicked:HTMLButtonElement) {
    const [kind,value]=action.split(':');
    const slot=Number(value);
    if(kind==='close') {this.back();return;}
    if(kind==='open') {
      if(this.mode==='pause') this.returnToPause=true;
      this.open(value);return;
    }
    if(kind==='save') {await this.callbacks.save();this.status('Partida guardada.');return;}
    if(kind==='menu') {this.callbacks.menu();return;}
    if(kind==='respawn') {this.closePanel();this.callbacks.respawn();return;}
    if(kind==='export') {await this.callbacks.export(slot);return;}
    if(kind==='continue'||kind==='start'||kind==='new-ok'){
      const list=await this.callbacks.slots();
      const current=list.find(item=>item.slot===slot);
      if(kind==='continue' && current?.state) this.callbacks.start(slot,current.state);
      if(kind==='start' && current?.state) this.show('replace',title('Reemplazar partida '+slot)+'<p>Se borrará el progreso de este espacio.</p>'+
        button('new-ok:'+slot,'Reemplazar','class="primary"')+' '+button('slots-back','Cancelar'));
      else if(kind!=='continue') this.callbacks.start(slot,null);
      return;
    }
    if(kind==='delete'){
      this.show('delete',title('Borrar partida '+slot)+'<p>Se borrará el archivo y su copia de recuperación.</p>'+
        button('delete-ok:'+slot,'Borrar partida')+' '+button('slots-back','Cancelar'));
      return;
    }
    if(kind==='delete-ok'){await this.callbacks.remove(slot);this.open(this.slotsMode);return;}
    if(kind==='slots-back'){this.open(this.slotsMode);return;}
    if(kind==='import'||kind==='import-ok'){
      if(kind==='import'&&(await this.callbacks.slots()).some(item=>item.slot===slot&&(item.state||item.corrupt))){
        this.show('replace',title('Importar en la partida '+slot)+'<p>Un archivo válido reemplazará la partida de este espacio.</p>'+
          button('import-ok:'+slot,'Elegir archivo','class="primary"')+' '+button('slots-back','Cancelar'));
        return;
      }
      const picker=document.createElement('input');
      picker.type='file';picker.accept='.json,application/json';
      picker.onchange=()=>{
        const file=picker.files?.[0];
        if(!file) return;
        void this.callbacks.import(slot,file).then(()=>{
          this.notification='Partida importada.';this.open(this.slotsMode);
        }).catch(error=>this.status(error.message));
      };
      picker.click();return;
    }
    if(kind==='travel'&&this.game?.fastTravel(slot)){this.closePanel();return;}
    if(kind==='finish'){this.game?.finish(value as Ending);return;}
    if(kind==='equip'&&this.game){
      this.game.equip(slot);this.inventory(this.game);
      this.body.querySelector<HTMLButtonElement>('[data-action="equip:'+slot+'"]')?.focus({preventScroll:true});
      return;
    }
    if(kind==='buy'&&this.game){
      if(this.game.buy(value as 'tonic'|'weapon'|'armor')) {this.shop(this.mode,this.game);this.status('Compra realizada.');}
      else this.status('No puedes completar esta compra.');
      return;
    }
    if(kind==='bind'){
      clicked.querySelector('kbd')!.textContent='Pulsa una tecla';
      this.input.rebind(code=>{
        const action=value as Action;
        const other=(Object.keys(bindings) as Action[]).find(key=>key!==action && this.settings.bindings[key]===code);
        if(other) this.settings.bindings[other]=this.settings.bindings[action];
        this.settings.bindings[action]=code;
        this.refreshSettings();this.settingsPanel();
        this.body.querySelector<HTMLButtonElement>('[data-action="bind:'+action+'"]')?.focus({preventScroll:true});
      });
      return;
    }
    if(kind==='weapon' && this.game) {
      this.game.equipWeapon(slot);this.inventory(this.game);
      this.body.querySelector<HTMLButtonElement>('[data-action="weapon:'+slot+'"]')?.focus({preventScroll:true});
      return;
    }
    if(kind==='reset-keys'){Object.assign(this.settings.bindings,bindings);this.refreshSettings();this.settingsPanel();}
  }

  controller(controller:Gamepad|undefined) {
    if(!controller){this.buttonsHeld.clear();return;}
    const now=new Set<number>();
    controller.buttons.forEach((item,index)=>{if(item.pressed) now.add(index);});
    if(this.dialog.open||this.isMenu){
      const pressed=(index:number)=>now.has(index)&&!this.buttonsHeld.has(index);
      const zone=this.dialog.open?this.body:this.$('menu');
      const focusables=[...zone.querySelectorAll<HTMLElement>('button:not([disabled]), input, select')];
      const current=focusables.indexOf(document.activeElement as HTMLElement);
      if(focusables.length && (pressed(12)||pressed(13))) {
        const next=(current+(pressed(13)?1:-1)+focusables.length)%focusables.length;
        focusables[next]?.focus();
      }
      if(pressed(0)) {
        const active=focusables[current]??focusables[0];
        if(active instanceof HTMLButtonElement) active.click();
        else if(active instanceof HTMLInputElement && active.type==='checkbox') active.click();
      }
      if(pressed(1)&&this.dialog.open&&!['death','ending','choice'].includes(this.mode)) this.back();
    }
    this.buttonsHeld=now;
  }

  status(message:string) {
    let target=this.body.querySelector<HTMLElement>('[data-notice]');
    if(!target && this.dialog.open){target=document.createElement('p');target.setAttribute('role','status');target.dataset.notice='';this.body.append(target);}
    if(this.dialog.open && target) target.textContent=message;
    else this.toast(message);
  }

  toast(message:string) {
    const element=this.$('toast');
    element.textContent=message;element.hidden=false;
    clearTimeout(this.toastTimer);
    this.toastTimer=window.setTimeout(()=>{element.hidden=true;},3500);
  }

  saved() {
    if(this.isMenu) return;
    this.$('save-indicator').textContent='Partida guardada';
    clearTimeout(this.saveTimer);
    this.saveTimer=window.setTimeout(()=>this.$('save-indicator').textContent='',1300);
  }

  locationTransition() {
    const element=this.$('transition');
    element.classList.remove('fade');
    void element.offsetWidth;
    element.classList.add('fade');
  }

  update(game:Game) {
    this.$('hp').style.width=game.state.hp/game.state.maxHp*100+'%';
    this.$('stamina').style.width=game.stamina+'%';
    this.$('magic').style.width=game.magic+'%';
    const boss=game.activeBoss;
    const bossElement=this.$('boss');
    bossElement.hidden=!boss;
    if(boss){
      bossElement.querySelector('strong')!.textContent=boss.spec.name+(boss.hp<=boss.spec.hp/2?' · Fase II':'');
      bossElement.querySelector<HTMLElement>('i')!.style.width=boss.hp/boss.spec.hp*100+'%';
    }
    const nearest=game.nearest();
    const altar=game.level.id==='d7'&&game.state.bosses.includes(7)&&game.point.z<4;
    const hint=this.$('hint');
    hint.hidden=!nearest&&!altar;
    if(!hint.hidden){
      hint.querySelector('kbd')!.textContent=nearest&&['entrance','next','back'].includes(nearest.kind)?'CRUZAR':keyName(this.settings.bindings.use);
      hint.querySelector('span')!.textContent=nearest?game.label(nearest):'Decidir el destino de Vaeloria';
    }
    const state=game.state;
    const key=[game.level.id,state.realm,state.hp,state.maxHp,state.gold,state.tonics,state.tool,state.weaponStyle,game.objective].join();
    if(key===this.lastHud) return;
    this.lastHud=key;
    this.$('hero-name').textContent=state.bosses.includes(2)?'EIRA':'VIAJERA';
    this.$('hp-text').textContent=state.hp+' / '+state.maxHp;
    this.$('gold').textContent='◆ '+state.gold+' brasas';
    this.$('tonics').textContent='✦ '+state.tonics+' tónicos';
    this.$('realm').textContent=state.realm?'Reverso Umbrío':'Reino de las Brasas';
    this.$('location').textContent=game.level.name;
    this.$('objective').textContent=game.objective;
    this.$('quickbar').innerHTML=[
      ['attack',weapons[state.weaponStyle].name],['use','Acción'],['dodge','Esquiva'],
      ...(state.tool>=0?[['tool',tools[state.tool].action]]:[]),
      ...(state.bosses.includes(0)?[['shift','Reverso']]:[])
    ].map(([action,name])=>`<span><kbd>${keyName(this.settings.bindings[action as Action])}</kbd> ${name}</span>`).join('');
  }
}
