import { Game, type Event } from './core/game';
import { fresh, readSave, type SaveState } from './core/state';
import { Input } from './input/controls';
import { Saves } from './saves/store';
import { Score } from './audio/score';
import { View } from './rendering/scene';
import { Interface } from './ui/interface';
import { getSettings } from './ui/settings';
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource/source-sans-3/latin-400.css';
import '@fontsource/source-sans-3/latin-600.css';
import './style.css';

const step=1/60;
const root=document.querySelector<HTMLElement>('#game')!;
const settings=getSettings();
const ui=new Interface(root,settings);
const input=new Input(settings.bindings,ui.canvas);
const saves=new Saves();
const score=new Score();
const backdrop=new Game({...fresh(),position:{x:8.7,z:7.6}});
let game=backdrop;
let activeSlot=0;
let view:View;
let pending:Promise<void>=Promise.resolve();
let lastSaveError=0;

function save(reset=false) {
  if(!activeSlot) return Promise.resolve();
  const slot=activeSlot;
  const snapshot=structuredClone(game.state);
  const request=pending.catch(()=>{}).then(()=>saves.write(slot,snapshot,reset));
  pending=request;
  return request.then(()=>ui.saved());
}
function handleSave() {
  void save().catch(()=>{
    if(Date.now()-lastSaveError>5000) ui.status('No se pudo guardar en este navegador.');
    lastSaveError=Date.now();
  });
}
function applySettings() {
  root.classList.toggle('reduced',settings.reduced);
  root.classList.toggle('high-contrast',settings.contrast);
  root.classList.toggle('large-text',settings.large);
  game.difficulty=settings.difficulty;
  view.settings(settings.quality,settings.reduced);
  score.set(settings.volumes);
}
function start(slot:number,state:SaveState|null) {
  activeSlot=slot;
  game=new Game(state??fresh(),settings.difficulty);
  input.clear();
  view.event({type:'level'});
  ui.enter(game,slot);
  if(!state) {
    void save(true).catch(()=>ui.status('No se pudo crear el guardado.'));
    ui.dialogue('La noche recuerda','Despiertas bajo un arco roto. Al este, una voz llama a quien pueda volver a tensar las cuerdas del santuario. Usa WASD o las flechas para moverte y acércate a los arcos para viajar.');
  }
}
function menu() {
  if(activeSlot && !game.dead) handleSave();
  activeSlot=0;
  game=backdrop;
  view.event({type:'level'});
  input.clear();
  ui.menu();
}

function events() {
  for(const event of game.events.splice(0)) {
    view.event(event);
    handle(event);
  }
}
function handle(event:Event) {
  switch(event.type){
    case 'toast':ui.toast(event.text);break;
    case 'fx':score.effect(event.kind,game.level.biome);break;
    case 'dialogue':ui.dialogue(event.title,event.text);break;
    case 'level':ui.locationTransition();break;
    case 'save':handleSave();break;
    case 'death':case 'shop':case 'smith':case 'choice':ui.open(event.type);break;
    case 'ending':ui.ending(event.ending);break;
  }
}

function run() {
  view=new View(ui.canvas,ui.numbers);
  ui.connect(input,{
    start,slots:async()=>{await pending.catch(()=>{});return saves.list();},save,menu,
    settings:applySettings,respawn:()=>game.respawn(),unlock:()=>{void score.unlock().catch(()=>{});},
    import:async(slot,file)=>{
      if(file.size>512_000) throw new Error('El archivo supera 512 KB.');
      const imported=readSave(JSON.parse(await file.text()));
      await pending.catch(()=>{});
      await saves.write(slot,imported,true);
    },
    export:async slot=>{
      if(slot===activeSlot) await save();
      const file=(await saves.list()).find(item=>item.slot===slot)?.state;
      if(!file) throw new Error('No hay partida disponible para exportar.');
      const url=URL.createObjectURL(new Blob([JSON.stringify(file,null,2)],{type:'application/json'}));
      const link=document.createElement('a');
      link.href=url;link.download='eclipse-404-partida-'+slot+'.json';link.click();
      setTimeout(()=>URL.revokeObjectURL(url),1500);
    },
    remove:async slot=>{await pending.catch(()=>{});await saves.remove(slot);}
  });
  applySettings();
  let last=performance.now();
  let accumulator=0;
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden && activeSlot && !game.dead) {input.clear();handleSave();}
  });
  const animate=(now:number)=>{
    const dt=Math.min(.10,(now-last)/1000);
    last=now;
    const menuBefore=ui.isMenu, pausedBefore=ui.paused;
    ui.controller(input.sample());
    const openActions=['pause','inventory','map','journal'] as const;
    for(const action of openActions){
      if(!input.take(action)) continue;
      if(ui.paused) ui.dismiss(action);
      else if(!ui.isMenu && !pausedBefore) ui.open(action);
    }
    if(!ui.isMenu && !ui.paused && !pausedBefore && !menuBefore){
      accumulator+=dt;
      while(accumulator>=step){
        game.step(step,input.frame());
        events();
        accumulator-=step;
        if(ui.paused){accumulator=0;break;}
      }
    } else {
      accumulator=0;
      input.discardActions();
      events();
    }
    if(!ui.isMenu) ui.update(game);
    const music=ui.isMenu?'menu':ui.paused?'story':game.activeBoss?'boss':
      game.actors.some(a=>a.hp>0 && !a.spec.boss && a.aware && (a.wind>0 || a.moving))?'battle':game.level.dungeon?'dungeon':'calm';
    score.update(game.level.biome,game.state.realm===1,music);
    view.render(game,accumulator/step,dt,now/1000,ui.isMenu);
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);

  if(import.meta.env.PROD && 'serviceWorker' in navigator){
    window.addEventListener('load',()=>{
      void navigator.serviceWorker.register(new URL('sw.js',document.baseURI)).then(registration=>{
        registration.addEventListener('updatefound',()=>{
          const worker=registration.installing;
          worker?.addEventListener('statechange',()=>{
            if(worker.state==='installed' && navigator.serviceWorker.controller && !ui.isMenu)
              ui.toast('Actualización preparada. Cierra y vuelve a abrir el juego para aplicarla.');
          });
        });
      }).catch(error=>console.info('Caché offline no disponible:',error));
    });
  }
}

try {run();}
catch(error){
  console.error(error);
  const message=error instanceof Error?error.message:'Error desconocido';
  root.innerHTML='<main class="launch-error"><h2>ECLIPSE OF ASH 404</h2><p>No se pudo iniciar el motor gráfico. Comprueba que el navegador admite WebGL 2 y que la aceleración gráfica está activada.</p><details><summary>Detalles técnicos</summary><pre>'+message.replace(/[&<>]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[char]!))+'</pre></details></main>';
}
