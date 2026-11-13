import { bosses, enemies, tools, type EnemySpec } from '../data/catalog';
import { weapons } from '../data/weapons';
import { dungeons, dungeonRegions, entryRequirements, levels, regions, route, targetPoint, tile, type Level, type LevelObject, type Point } from '../data/levels';
import { endings, memories, questDefs, villageEpilogue, type Ending, type QuestId } from '../data/story';
import { blocked, clearLine, distance, slide, vector } from './geometry';
import { type SaveState } from './state';

export type Difficulty='story'|'normal'|'hard';
export interface Controls {
  x:number; z:number; run:boolean; attack:boolean; attackUp:boolean; block:boolean;
  dodge:boolean; tool:boolean; use:boolean; shift:boolean; heal:boolean;
}
export const neutral:Controls={x:0,z:0,run:false,attack:false,attackUp:false,block:false,dodge:false,tool:false,use:false,shift:false,heal:false};
export interface Actor extends Point {
  id:string; spec:EnemySpec; hp:number; previous:Point; home:Point; facing:Point;
  wind:number; cooldown:number; stun:number; flash:number; turns:number; moving:boolean; alert:number; aware:boolean;
}
export interface Missile extends Point { dx:number; dz:number; life:number; damage:number }
export type FxKind='notice'|'slash'|'charge'|'dodge'|'shift'|'hit'|'heal'|'chest'|'gate'|'tool'|'warning'|'boss'|'step'|'block'|'bomb';
export type Event =
  | { type:'toast'; text:string }
  | { type:'dialogue'; title:string; text:string }
  | { type:'fx'; kind:FxKind; point:Point; text?:string; from?:Point; facing?:Point; weaponStyle?:number }
  | { type:'shop'|'smith'|'save'|'death'|'level'|'choice' }
  | { type:'ending'; ending:Ending };

const questAt:Record<number,QuestId>={0:'letter',4:'names',7:'seed'};
const residents=[
  ['El Guardabosques','El santuario que ves al este lleva siglos cerrado. Las cuerdas de su puerta aún están tensas.'],
  ['Maela','Mi hijo se fue al bosque a dejar una carta. Si la encuentras, tráemela. Todavía sé reconocer su letra.'],
  ['Neris','Las piedras apuntan al lugar donde cayó la primera sombra. En el pantano aseguran que aún pueden oírla.'],
  ['El fundidor Sain','El capataz pidió una cuerda y un nombre. Encontrarás los dos al fondo de la mina.'],
  ['Teren, barquero','Los nombres que la catedral olvidó se atascan al norte. Busca entre los juncos.'],
  ['Otilia','Los cristales conservan un reflejo de la mañana. Los de medianoche solo brillan si los miras desde el Reverso.'],
  ['La portera Bera','La reina coleccionó rostros porque la gente seguía perdiéndolos. El mío lo dejé en el salón del trono.'],
  ['Ivara','Mi último encargo es una semilla de estos jardines. La quiero plantar junto a la fragua de la aldea.'],
  ['El testigo de barro','Te vi llegar por aquí dos veces. La segunda llevabas las manos vacías.'],
  ['La voz del umbral','Quien cierre el eclipse tendrá que decidir qué hacer con el recuerdo que lo mantiene abierto.']
];
const echoes=[
  ['Sombra del Guardabosques','La senda sobre el agua aparece cuando la aldea deja de recordarla.'],
  ['Teren','Aquí conservo los nombres que la catedral perdió. El último todavía flota en el pantano.'],
  ['Neris, eco','Ya he visto esta llanura al sol. Huele a lluvia incluso cuando no llueve.'],
  ['Aprendiz de bronce','Si el capataz te ve con su garfio, prepara el escudo. Siempre comprueba quién usa sus herramientas.'],
  ['Campanera','En el fondo queda una campana. Delante de ella puedes escuchar a quienes sobrevivieron.'],
  ['La náufraga','La Aguja te ve antes de que tú la veas. Muévete cuando deje de girar.'],
  ['El ujier','En este lado puedes caminar con tu propia cara. Te pido que la conserves.'],
  ['El jardinero pequeño','Los monolitos tienen raíces. Empuja desde cerca y escucha cuándo encajan.'],
  ['El testigo de piedra','La otra Eira me pidió que esperara aquí. Le prometí que esperaría a las dos.'],
  ['Eco sin nombre','Antes de partir el sol, escribiste un nombre en la pared. Al despertar lo leerás por última vez.']
];

export class Game {
  state:SaveState;
  level:Level;
  actors:Actor[]=[];
  missiles:Missile[]=[];
  events:Event[]=[];
  previous:Point;
  facing:Point={x:0,z:-1};
  time=0;
  stamina=100;
  magic=100;
  swing=0;
  swingLength=.21;
  guard=false;
  moving=false;
  movementSpeed=0;
  invincible=0;
  shiftFlash=0;
  combo=0;
  charge=0;
  difficulty:Difficulty;
  dead=false;
  private dodgeTime=0;
  private dodgeDirection:Point={x:0,z:0};
  private comboTime=0;
  private attackTime=0;
  private toolTime=0;
  private stepTime=0;
  private saveTime=0;
  private actorsAcrossRealms=new Map<number,Actor[]>();
  private transitionCooldown=0;
  private bomb:{ point:Point; time:number; target?:LevelObject }|null=null;

  get activeBomb() {return this.bomb;}

  constructor(state:SaveState,difficulty:Difficulty='normal') {
    this.state=state;
    this.level=levels.get(state.level) ?? levels.get('r0')!;
    this.difficulty=difficulty;
    if (state.hp===0 || this.isBlocked(state.position)) {
      state.position={...this.level.spawn};
      if (state.hp===0) state.hp=state.maxHp;
    }
    this.previous={...state.position};
    this.spawnEnemies();
  }

  get point() { return this.state.position; }
  get gateOpen() { const gate=this.level.objects.find(item=>item.kind==='gate'); return !!gate && !!this.state.flags[gate.id]; }
  get activeBoss() { return this.actors.find(a=>a.spec.boss&&a.hp>0&&this.point.z<4.4); }
  get canWeave() { return questDefs.every(q=>this.state.quests[q.id]==='done'); }
  get objective() {
    if (this.state.ending) return 'Epílogo alcanzado. Puedes volver al altar o completar los encargos.';
    if (this.state.bosses.length===8) return 'Regresa al altar final para decidir el destino de Vaeloria.';
    if (!this.level.dungeon) {
      const nextDungeon=this.state.bosses.length;
      const destination=dungeonRegions[nextDungeon];
      if (destination===this.level.index) return 'Entra en ' + dungeons[nextDungeon].name + '. Busca el arco con dos antorchas.';
      const current=route.indexOf(this.level.index), target=route.indexOf(destination);
      const next=regions[route[current+(current<target?1:-1)]];
      return 'Cruza hacia '+next.name+'. Tu destino es '+dungeons[nextDungeon].name+'.';
    }
    if (!this.state.tools.includes(this.level.index)) return 'Abre el relicario de la mazmorra.';
    if (!this.gateOpen) return dungeons[this.level.index].hint;
    if (this.state.bosses.includes(this.level.index)) return 'Regresa al mundo exterior. El espejo es opcional.';
    return 'Cruza la puerta y derrota a ' + bosses[this.level.index].name + '.';
  }

  isBlocked(point:Point,realm=this.state.realm,allowWater=this.state.bosses.includes(2)) {
    if (blocked(this.level,point,realm,allowWater,this.gateOpen)) return true;
    return this.level.objects.some(item => item.kind==='target' && this.level.index===4 && this.level.dungeon &&
      this.visible(item,realm) && distance(point,targetPoint(this.level,item,!!this.state.flags[item.id]))<.55);
  }

  visible(item:LevelObject, realm=this.state.realm) {
    if (item.kind==='target') return dungeons[this.level.index].layers[Number(item.marker)-1]===realm;
    if (item.kind==='quest') return this.level.index===4 ? realm===1 : realm===0;
    return true;
  }

  spawnEnemies() {
    this.actors=[];
    this.missiles=[];
    let index=0;
    for (const item of this.level.objects) {
      if (item.kind!=='enemy' && item.kind!=='boss') continue;
      const boss=item.kind==='boss';
      if (boss && this.state.bosses.includes(this.level.index)) continue;
      const pool=this.level.dungeon ? regions[dungeonRegions[this.level.index]].enemy : regions[this.level.index].enemy;
      const spec=boss ? bosses[this.level.index] :
        this.state.realm ? enemies[[1,7,10,11][(this.level.index+index++)%4]] : enemies[pool[index++%pool.length] ?? 0];
      this.actors.push({id:item.id,spec,x:item.x,z:item.z,home:{x:item.x,z:item.z},previous:{x:item.x,z:item.z},hp:spec.hp,
        facing:{x:0,z:1},wind:0,cooldown:.55,stun:0,flash:0,turns:0,moving:false,alert:0,aware:false});
    }
  }

  private toast(text:string) { this.events.push({type:'toast',text}); }
  private say(title:string,text:string) { this.events.push({type:'dialogue',title,text}); }
  private fx(kind:FxKind,point:Point=this.point,text?:string,from?:Point,facing?:Point,weaponStyle?:number) {
    this.events.push({type:'fx',kind,point:{x:point.x,z:point.z},text,from:from?{...from}:undefined,facing:facing?{...facing}:undefined,weaponStyle});
  }
  private save() { this.events.push({type:'save'}); }

  travel(id:string,entry?:string) {
    const next=levels.get(id);
    if (!next) return;
    this.level=next;
    this.state.level=id;
    if(!next.dungeon) this.state.flags['visit:'+id]=true;
    const destination=next.objects.find(object=>object.kind===entry) ?? next.spawn;
    const reciprocal=next.objects.find(object=>object.kind==='back');
    const origin=next.dungeon ? reciprocal : entry==='entrance'||entry==='next'||entry==='back' ? destination : undefined;
    const away=origin && distance(origin,destination)<1.2 ? vector(origin,next.spawn) : null;
    const offset=away ? {x:destination.x+away.x*1.25,z:destination.z+away.z*1.25} : destination;
    this.state.position=blocked(next,offset,this.state.realm,this.state.bosses.includes(2),!!this.state.flags[next.objects.find(item=>item.kind==='gate')?.id??''])
      ? {x:destination.x,z:destination.z} : {...offset};
    this.previous={...this.point};
    this.actorsAcrossRealms.clear();
    this.spawnEnemies();
    this.bomb=null;
    this.dodgeTime=0;
    this.swing=0;
    this.stepTime=0;
    this.invincible=1;
    this.transitionCooldown=.85;
    this.events.push({type:'level'});
    this.save();
  }

  get canFastTravel() {
    return !this.level.dungeon && this.state.bosses.length>=3 &&
      this.level.objects.some(item=>item.kind==='shrine'&&distance(item,this.point)<1.5);
  }

  fastTravel(index:number) {
    const id='r'+index;
    if(!this.canFastTravel || !this.state.flags['visit:'+id] || id===this.level.id) return false;
    this.travel(id,'shrine');
    return true;
  }

  nearest() {
    return this.level.objects.filter(item=> !['enemy','boss'].includes(item.kind) && this.visible(item) &&
      !(this.state.flags[item.id] && ['key','chest'].includes(item.kind)) &&
      !(item.kind==='tool' && this.state.tools.includes(this.level.index)) &&
      !(item.kind==='quest' && this.state.quests[questAt[this.level.index]]) &&
      !(item.kind==='gate' && this.gateOpen))
      .map(item=>({item,dist:distance(this.point,targetPoint(this.level,item,!!this.state.flags[item.id]))}))
      .filter(pair=>pair.dist<1.4).sort((a,b)=>a.dist-b.dist)[0]?.item;
  }

  label(item:LevelObject) {
    switch (item.kind) {
      case 'entrance': return 'Cruzar · '+(dungeons as readonly (typeof dungeons[number])[])[regions[this.level.index].dungeon]?.name;
      case 'next': return 'Cruzar · '+regions[route[route.indexOf(this.level.index)+1]].name;
      case 'back': return this.level.dungeon ? 'Cruzar al exterior' : 'Cruzar · '+regions[route[route.indexOf(this.level.index)-1]].name;
      case 'npc': return 'Hablar · '+(this.state.realm ? echoes : residents)[this.level.index][0];
      case 'merchant':return 'Comerciar · Bastián';
      case 'smith':return 'Mejorar equipo · Ivara';
      case 'inscription':return 'Leer · Inscripción desgastada';
      case 'oath':return 'Leer · La promesa en la piedra';
      case 'bell':return 'Escuchar · Campana del embarcadero';
      case 'tool':return 'Abrir relicario';
      case 'key':return 'Recoger llave';
      case 'gate':return 'Abrir puerta sellada';
      case 'target':return dungeons[this.level.index].targets[Number(item.marker)-1];
      case 'quest':return 'Abrir cofre oculto';
      case 'shrine':return 'Descansar y guardar';
      default:return 'Abrir cofre';
    }
  }

  interact(item=this.nearest()) {
    if (!item) {
      if (this.level.id==='d7' && this.state.bosses.includes(7) && this.point.z<4) this.events.push({type:'choice'});
      return;
    }
    switch (item.kind) {
      case 'npc': {
        const quest=this.level.index===1 ? (this.state.realm ? 'names' : 'letter') : undefined;
        if (quest && this.state.quests[quest]==='found') { this.completeQuest(quest); break; }
        if (this.level.index===1 && !this.state.realm && this.state.ending) {
          this.say(...villageEpilogue[this.state.ending]);
          break;
        }
        const [title,text]=(this.state.realm ? echoes : residents)[this.level.index];
        this.say(title,text);
        break;
      }
      case 'inscription': {
        const inscriptions:Record<number,[string,string]>={
          2:['El día en que cayó la sombra, nadie vio caer el sol. Todos recordaron una mañana distinta.','La piedra menciona un noveno testigo. Alguien borró su nombre, pero dejó intacta la palabra «hermano».'],
          5:['Los fragmentos reflejan habitaciones que no existen en esta costa. El mar guarda una ciudad debajo de otra.','Un cristal roto conserva dos voces que pronuncian Eira a la vez. Ninguna parece mentir.'],
          8:['Aquí la gravedad olvidó hacia dónde apuntaba. Una mano señala al alba, la otra al nombre enterrado.','Tu reflejo ha escrito una pregunta en la piedra: «¿A quién salvarías si los dos fuerais reales?».']
        };
        const first=!this.state.flags[item.id];
        this.state.flags[item.id]=true;
        if(first){this.state.gold+=5;this.save();}
        this.say('Memoria hallada',inscriptions[this.level.index]?.[this.state.realm]??'La inscripción está rota.');
        break;
      }
      case 'oath':
        this.say('La promesa en la piedra',this.state.realm
          ? 'Reconoces la letra de tu hermano. «Si no vuelvo a tiempo, abre las ventanas igual. A la luz no le importa quién la esté esperando».'
          : 'Hay dos marcas a la altura de una mano pequeña. Debajo, con tu letra: «Cuando vuelva la mañana, te prometo que estarás aquí».');
        break;
      case 'bell':
        this.say('La campana del embarcadero',this.state.realm
          ? 'El bronce sigue frío. Desde el muelle del norte, alguien tira de una cuerda invisible. Allí donde el agua estaba quieta, ahora puedes cruzar.'
          : 'La placa dice «Toque de evacuación». Alguien raspó la fecha y escribió debajo «Llevad a los niños primero». El puente desapareció con la última barca.');
        break;
      case 'merchant': this.events.push({type:'shop'}); break;
      case 'smith':
        if (this.state.quests.seed==='found' && !this.state.realm) this.completeQuest('seed');
        else this.events.push({type:'smith'});
        break;
      case 'next': {
        const target=route[route.indexOf(this.level.index)+1];
        if (this.state.bosses.length<entryRequirements[target]) {
          this.toast('La ruta sigue cerrada. Supera '+dungeons[this.state.bosses.length].name+'.');
          break;
        }
        this.travel('r'+target,'back');
        break;
      }
      case 'back':
        if (this.level.dungeon) this.travel('r'+dungeonRegions[this.level.index],'entrance');
        else this.travel('r'+route[route.indexOf(this.level.index)-1],'next');
        break;
      case 'entrance': {
        const dungeon=regions[this.level.index].dungeon;
        if (this.state.bosses.length>=dungeon) this.travel('d'+dungeon);
        else this.toast('El sello se abrirá después de '+dungeons[this.state.bosses.length].name+'.');
        break;
      }
      case 'chest':
        if (this.state.flags[item.id]) break;
        this.state.flags[item.id]=true;
        this.state.gold+=8;
        if (this.level.dungeon) {
          const weaponReward=({1:1,2:2,4:3} as Record<number,number>)[this.level.index];
          if(weaponReward && !this.state.foundWeapons.includes(weaponReward)){
            this.state.foundWeapons.push(weaponReward);
            this.toast(weapons[weaponReward].name+' · Nueva arma en el inventario');
          }
          this.state.maxHp=Math.min(20,this.state.maxHp+1);
          this.state.hp=this.state.maxHp;
          this.toast('Corazón de Vaeloria · Vida máxima +1 · 8 brasas');
        } else {
          this.state.tonics=Math.min(99,this.state.tonics+1);
          this.toast('Un tónico · 8 brasas');
        }
        this.fx('chest',item);
        this.save();
        break;
      case 'quest': {
        const id=questAt[this.level.index];
        if (this.state.quests[id]) break;
        this.state.quests[id]='found';
        this.toast('Diario actualizado · '+questDefs.find(q=>q.id===id)!.title);
        this.fx('chest',item);
        this.save();
        break;
      }
      case 'tool': {
        const index=this.level.index;
        if (this.state.tools.includes(index)) break;
        this.state.tools.push(index);
        this.state.tool=index;
        this.magic=100;
        this.fx('chest',item);
        this.say(tools[index].name,tools[index].description+' '+dungeons[index].hint);
        this.save();
        break;
      }
      case 'key':
        this.state.flags[item.id]=true;
        this.fx('chest',item);
        this.toast('Llave de '+this.level.name);
        this.save();
        break;
      case 'gate': {
        const key=this.level.objects.find(obj=>obj.kind==='key')!;
        if (!this.state.flags[key.id] || this.level.objects.some(obj=>obj.kind==='target'&&!this.state.flags[obj.id])) {
          this.toast(!this.state.flags[key.id] ? 'Falta la llave de la mazmorra.' : dungeons[this.level.index].hint);
          break;
        }
        this.state.flags[item.id]=true;
        if(this.level.id==='d1') this.toast('La reja del embarcadero también se abre.');
        this.fx('gate',item);
        this.save();
        break;
      }
      case 'target':this.toast(dungeons[this.level.index].hint);break;
      case 'shrine':
        this.state.hp=this.state.maxHp;
        this.magic=100;
        this.fx('heal',item);
        this.toast('Descansaste junto al fuego.');
        this.save();
        break;
    }
  }

  private completeQuest(id:QuestId) {
    const quest=questDefs.find(q=>q.id===id)!;
    this.state.quests[id]='done';
    this.state.gold+=quest.reward;
    this.save();
    const thanks={letter:'Reconozco la mancha de tinta. Dejó la carta abierta para que yo pudiera leerla.',names:'Ahora el Reverso sabe a quién devolverle esta sombra.',seed:'La plantaré aquí. Si vuelve el alba, quiero que encuentre algo verde.'};
    this.say(quest.title,thanks[id]+' · '+quest.reward+' brasas.');
  }

  buy(kind:'tonic'|'weapon'|'armor') {
    const cost=kind==='tonic' ? 6 : kind==='weapon' ? 20+this.state.weapon*14 : 25;
    if ((kind==='weapon' && this.state.weapon===2) || (kind==='armor' && this.state.armor===1) || (kind==='tonic' && this.state.tonics===99)) {
      this.toast('Ya alcanzaste el máximo.'); return false;
    }
    if (this.state.gold<cost) { this.toast('Brasas insuficientes.'); return false; }
    this.state.gold-=cost;
    if (kind==='tonic') this.state.tonics++;
    if (kind==='weapon') this.state.weapon++;
    if (kind==='armor') this.state.armor++;
    this.fx('chest');
    this.save();
    return true;
  }

  heal() {
    if (!this.state.tonics || this.state.hp===this.state.maxHp) return;
    this.state.tonics--;
    this.state.hp=Math.min(this.state.maxHp,this.state.hp+4);
    this.fx('heal');
    this.save();
  }

  shift() {
    if (!this.state.bosses.includes(0)) { this.toast('La Resonancia duerme bajo el Santuario.');return false; }
    if (this.shiftFlash>.15) return false;
    const realm=this.state.realm===0 ? 1 : 0;
    if (this.isBlocked(this.point,realm)) {this.toast('En el otro lado, este paso está cerrado.');return false;}
    this.state.realm=realm;
    this.bomb=null;
    const boss=this.actors.find(actor=>actor.spec.boss);
    this.actorsAcrossRealms.set(1-realm,this.actors.filter(actor=>!actor.spec.boss));
    const returning=this.actorsAcrossRealms.get(realm);
    if (returning) {
      this.actors=boss?[...returning,boss]:returning;
      this.missiles=[];
    } else {
      this.spawnEnemies();
      const newBoss=this.actors.findIndex(actor=>actor.spec.boss);
      if (boss && newBoss>=0) this.actors[newBoss]=boss;
    }
    for (const actor of this.actors) {
      if (actor.spec.boss) continue;
      actor.previous={x:actor.x,z:actor.z};
      actor.wind=0;
      actor.moving=false;
      actor.aware=false;
      actor.alert=0;
    }
    this.shiftFlash=.6;
    this.fx('shift');
    this.save();
    return true;
  }

  equipWeapon(index:number) {
    if (!this.state.foundWeapons.includes(index)) return false;
    this.state.weaponStyle=index;
    this.save();
    return true;
  }

  equip(index:number) {
    if (!this.state.tools.includes(index)) return;
    this.state.tool=index;
  }

  private line(a:Point,b:Point) { return clearLine(a,b,point=>blocked(this.level,point,this.state.realm,true,this.gateOpen,.04)); }

  private closest(range:number,arc:number) {
    return this.actors.filter(actor=>actor.hp>0 && distance(actor,this.point)<=range && this.line(this.point,actor) &&
      (!actor.spec.boss||this.point.z<4.4) && (distance(actor,this.point)<.48 || this.dot(actor)>=arc))
      .sort((a,b)=>distance(a,this.point)-distance(b,this.point));
  }

  private dot(target:Point) {
    const aim=vector(this.point,target);
    return aim.x*this.facing.x+aim.z*this.facing.z;
  }

  useTool() {
    const tool=this.state.tool;
    if (tool<0) {this.toast('Aún no tienes una herramienta.');return;}
    if (this.magic<17 || this.toolTime>0) return;
    this.magic-=17;
    this.toolTime=.25;
    const range=[6,2.3,7,2.2,1.5,5,2.5,3.4][tool];
    const targets=this.level.dungeon && this.level.index===tool ? this.level.objects.filter(item=>item.kind==='target' &&
      this.visible(item) && !this.state.flags[item.id] && distance(this.point,item)<=range && this.line(this.point,item)) : [];
    const order=this.level.dungeon ? dungeons[this.level.index].order : [];
    const expected=order.find(index=>!this.level.objects.some(item=>item.kind==='target'&&Number(item.marker)===index+1&&this.state.flags[item.id]));
    const correct=targets.find(item=>Number(item.marker)===Number(expected)+1);
    this.fx('tool',correct ?? this.point,undefined,correct&&[0,2,5].includes(tool)?this.point:undefined);
    if (correct) {
      if (tool===4 && this.point.z<correct.z+.36) {this.toast('Colócate al sur del monolito para empujarlo.');return;}
      if (tool===1) {this.bomb={point:{...this.point},time:.42,target:correct};return;}
      if (tool===2||tool===6) {
        const direction=vector(this.point,correct);
        const offset=tool===6?.65:-.53;
        const landing={x:correct.x+direction.x*offset,z:correct.z+direction.z*offset};
        const safe=this.isBlocked(landing) ? {x:correct.x,z:correct.z} : landing;
        if (!this.isBlocked(safe)) {this.state.position=safe;this.previous={...safe};}
      }
      this.activateTarget(correct);
      return;
    }
    if (targets.length) {this.toast('El orden importa. '+dungeons[this.level.index].hint);return;}
    if (tool===1 && this.level.id==='r0' && distance(this.point,{x:19.5,z:2.5})<2.4 && !this.state.flags['secret:r0']) {
      this.state.flags['secret:r0']=true;
      this.state.gold+=22;
      this.state.maxHp=Math.min(20,this.state.maxHp+1);
      this.state.hp=this.state.maxHp;
      this.toast('El muro cede · Corazón de Vaeloria y 22 brasas.');
      this.fx('bomb');
      this.save();
      return;
    }
    if (tool===1) { this.bomb={point:{...this.point},time:.46}; return; }
    if (tool===6) { this.invincible=Math.max(this.invincible,1.2); this.fx('dodge'); }
    const victims=this.closest(range,[.08,-1,.1,-.65,-.4,.1,-1,-1][tool]);
    for (const actor of (tool===7 ? victims : victims.slice(0,1))) {
      const hurt=actor.spec.weakness===tool ? 4 : 2;
      if (tool===2 && !actor.spec.boss) {
        const direction=vector(actor,this.point);
        slide(actor,direction.x*1.2,direction.z*1.2,p=>this.isBlocked(p));
      }
      if ([0,2,5].includes(tool)) this.fx('tool',actor,undefined,this.point);
      if (tool===5) actor.stun=1.15;
      this.hurt(actor,hurt,tool===4);
    }
  }

  private activateTarget(target:LevelObject) {
    this.state.flags[target.id]=true;
    this.fx('gate',target);
    this.toast(this.label(target)+' · activado');
    this.save();
  }

  private strike(charged:boolean) {
    if (this.attackTime>0 || this.dodgeTime>0 || this.guard) return;
    const style=this.state.weaponStyle;
    const weapon=weapons[style];
    const empowered=charged || style===1;
    if(style===3 && this.magic<13) {this.toast('Falta resonancia para el Filo del Testigo.');return;}
    if(style===3) this.magic-=13;
    this.combo=this.comboTime>0 && style===0 ? this.combo%3+1 : 1;
    this.comboTime=.8;
    this.attackTime=weapon.cooldown+(charged?.17:0);
    this.swingLength=weapon.cooldown;
    this.swing=this.swingLength;
    this.fx(empowered?'charge':'slash',this.point,undefined,undefined,this.facing,style);
    for (const actor of this.closest(weapon.reach+(charged?.35:0),weapon.arc)) {
      const protectedEnemy=actor.spec.pattern==='guard' && !actor.wind && actor.cooldown<.3 && actor.stun<=0;
      const damage=weapon.damage+(charged?1:0)+(style===0&&this.combo===3?1:0)+this.state.weapon;
      this.hurt(actor,protectedEnemy&&!empowered?1:damage,weapon.stagger||charged);
    }
  }

  private hurt(actor:Actor,amount:number,stagger=false) {
    if (actor.hp<=0) return;
    const before=actor.hp;
    actor.hp-=amount;
    if(actor.spec.boss && before>actor.spec.hp/2 && actor.hp>0 && actor.hp<=actor.spec.hp/2){
      const phaseLines=[
        'El Ciervo arrastra las raíces hacia el centro.',
        'La Abadesa hace vibrar las campanas sumergidas.',
        'El Capataz libera vapor de las grietas del metal.',
        'La Reina abandona un rostro y revela otro.',
        'El Jardinero despierta bajo los monolitos.',
        'La Aguja devuelve la luz en fragmentos.',
        'El Otro Testigo imita tus movimientos.',
        'Sol sin Nombre abre su segundo horizonte.'
      ];
      this.toast(phaseLines[this.level.index]);
      this.fx('boss',actor);
    }
    actor.flash=.18;
    if (stagger || !actor.spec.boss && !actor.wind) {
      actor.wind=0;
      actor.stun=Math.max(actor.stun,stagger?.56:.18);
      const direction=vector(this.point,actor);
      slide(actor,direction.x*.32,direction.z*.32,p=>this.isBlocked(p));
    }
    this.fx('hit',actor,String(amount));
    if (actor.hp>0) return;
    this.state.gold+=actor.spec.boss ? 12 : 2;
    if (this.difficulty==='story' && !actor.spec.boss) this.state.hp=Math.min(this.state.maxHp,this.state.hp+1);
    if (actor.spec.boss && !this.state.bosses.includes(this.level.index)) {
      const index=this.level.index;
      this.state.bosses.push(index);
      this.state.hp=this.state.maxHp;
      this.magic=100;
      this.missiles=[];
      this.fx('boss',actor);
      const reward=index===0 ? ' Resonancia del Eclipse desbloqueada (R).' : index===2 ? ' Ya puedes nadar.' : '';
      this.say('Recuerdo '+(index+1)+' · '+actor.spec.name,memories[index]+reward);
      this.save();
    }
  }

  finish(ending:Ending) {
    if (!this.state.bosses.includes(7) || this.level.id!=='d7' || this.point.z>=4 || !(ending in endings) ||
        ending==='weave'&&!this.canWeave) return;
    this.state.ending=ending;
    this.save();
    this.events.push({type:'ending',ending});
  }

  respawn() {
    this.dead=false;
    this.state.hp=this.state.maxHp;
    this.stamina=100;
    this.magic=100;
    this.travel(this.level.id);
  }

  private damage(amount:number,source:Point) {
    if (this.invincible>0 || this.dead) return;
    if (this.guard && this.stamina>=13 && this.dot(source)>-.13) {
      this.stamina-=13;
      this.fx('block');
      if (this.charge<.15) {
        this.attackTime=0;
        const foe=this.closest(2.1,-.2)[0];
        if (foe) this.hurt(foe,1+this.state.armor,true);
      }
      return;
    }
    const adjustment=this.difficulty==='hard' ? 1 : this.difficulty==='story' ? -1 : 0;
    const damage=Math.max(1,amount+adjustment-this.state.armor);
    this.state.hp=Math.max(0,this.state.hp-damage);
    this.invincible=1.0;
    const force=vector(source,this.point);
    slide(this.point,force.x*.39,force.z*.39,p=>this.isBlocked(p));
    this.fx('hit',this.point,'−'+damage);
    if (this.state.hp===0) {
      this.dead=true;
      this.events.push({type:'death'});
    }
  }

  private enemyAttack(actor:Actor) {
    const spec=actor.spec;
    const target=vector(actor,this.point);
    const phase=spec.boss && actor.hp<=spec.hp/2;
    const pattern=phase && actor.turns%3===0 ? (spec.pattern==='pulse' ? 'volley' : 'pulse') : spec.pattern;
    if (['bolt','orbit','volley','pulse'].includes(pattern)) {
      const rotation=Math.atan2(target.z,target.x);
      const angles=pattern==='pulse' ? Array.from({length:phase?10:7},(_,i)=>i*2*Math.PI/(phase?10:7)) :
        pattern==='volley' ? [-.37,0,.37] : [0];
      const speed=phase?5.35:4.3;
      for (const angle of angles) {
        const dx=Math.cos(rotation+angle),dz=Math.sin(rotation+angle);
        this.missiles.push({x:actor.x+dx*.44,z:actor.z+dz*.44,dx:dx*speed,dz:dz*speed,life:2,damage:spec.damage});
      }
    } else {
      if (pattern==='lunge') slide(actor,target.x*.8,target.z*.8,p=>this.isBlocked(p));
      const extra=pattern==='sweep' || pattern==='burst' ? .65 : .15;
      if (distance(actor,this.point)<=spec.reach+extra && this.line(actor,this.point)) this.damage(spec.damage,actor);
    }
    actor.turns++;
    actor.cooldown=(spec.boss?1.13:1.23)*(phase?.76:1);
  }

  private stepEnemies(dt:number) {
    for (const actor of this.actors) {
      actor.previous={x:actor.x,z:actor.z};
      actor.moving=false;
      actor.flash=Math.max(0,actor.flash-dt);
      if (actor.hp<=0 || actor.spec.boss && this.point.z>=4.4) continue;
      if (actor.stun>0) {actor.stun-=dt;continue;}
      const dist=distance(actor,this.point);
      const spec=actor.spec;
      const seesPlayer=dist<=Math.max(spec.reach+.25,5.35) && this.line(actor,this.point);
      if (!spec.boss && !actor.wind) {
        if (!actor.aware) {
          if (seesPlayer) {
            actor.aware=true;
            actor.alert=.58;
            actor.facing=vector(actor,this.point);
            this.fx('notice',actor);
          }
          continue;
        }
        if (actor.alert>0) {
          actor.alert=Math.max(0,actor.alert-dt);
          actor.facing=vector(actor,this.point);
          continue;
        }
        if (dist>8.5) {actor.aware=false;continue;}
      }
      actor.cooldown-=dt;
      if (actor.wind>0) {
        actor.wind-=dt;
        if (actor.wind<=0) this.enemyAttack(actor);
      } else if (dist<=spec.reach && actor.cooldown<=0 && this.line(actor,this.point)) {
        actor.wind=spec.warning*(this.difficulty==='story'?1.18:1);
        actor.facing=vector(actor,this.point);
        this.fx('warning',actor);
      } else if (seesPlayer && (dist>spec.reach*.75 || spec.pattern==='orbit')) {
        const target=vector(actor,this.point);
        actor.facing=target;
        const sideways=spec.pattern==='orbit' && dist<spec.reach;
        const dx=sideways ? -target.z : target.x;
        const dz=sideways ? target.x : target.z;
        const before={x:actor.x,z:actor.z};
        slide(actor,dx*spec.speed*dt,dz*spec.speed*dt,p=>this.isBlocked(p) || this.actors.some(other=>other!==actor&&other.hp>0&&distance(other,p)<.49));
        actor.moving=distance(before,actor)>.001;
      }
    }
    this.missiles=this.missiles.filter(shot=>{
      shot.x+=shot.dx*dt;
      shot.z+=shot.dz*dt;
      shot.life-=dt;
      if (shot.life<=0 || blocked(this.level,shot,this.state.realm,true,this.gateOpen,.03)) return false;
      if (distance(shot,this.point)<.36) { this.damage(shot.damage,{x:shot.x-shot.dx,z:shot.z-shot.dz}); return false; }
      return true;
    });
  }

  step(dt:number,input:Controls) {
    if (this.dead) return;
    this.previous={...this.point};
    this.time+=dt;
    this.invincible=Math.max(0,this.invincible-dt);
    this.shiftFlash=Math.max(0,this.shiftFlash-dt);
    this.swing=Math.max(0,this.swing-dt);
    this.transitionCooldown=Math.max(0,this.transitionCooldown-dt);
    this.dodgeTime=Math.max(0,this.dodgeTime-dt);
    this.comboTime=Math.max(0,this.comboTime-dt);
    this.attackTime=Math.max(0,this.attackTime-dt);
    this.toolTime=Math.max(0,this.toolTime-dt);
    this.magic=Math.min(100,this.magic+dt*19);
    const magnitude=Math.hypot(input.x,input.z);
    const direction={x:input.x/Math.max(magnitude,1),z:input.z/Math.max(magnitude,1)};
    this.guard=input.block && this.stamina>3;
    if (magnitude>.12 && !this.dodgeTime) this.facing=vector({x:0,z:0},direction);
    if (input.dodge && this.dodgeTime<=0 && this.stamina>=24) {
      this.stamina-=24;
      this.dodgeTime=.22;
      this.invincible=Math.max(this.invincible,.34);
      this.dodgeDirection={...this.facing};
      this.fx('dodge');
    }
    const running=input.run && this.stamina>8 && magnitude>.12;
    const speed=this.dodgeTime ? 9.2 : this.guard ? 2.05 : tile(this.level,this.point.x,this.point.z,this.state.realm)==='~' ? 2.6 : running ? 6.4 : 4.85;
    this.stamina=Math.max(0,Math.min(100,this.stamina+dt*(running?-15:this.guard?4:28)));
    const move=this.dodgeTime ? this.dodgeDirection : direction;
    slide(this.point,move.x*speed*dt,move.z*speed*dt,point=>this.isBlocked(point));
    if (!this.transitionCooldown && distance(this.previous,this.point)>.001) {
      const portal=this.level.objects.find(item=>{
        if(!['entrance','next','back'].includes(item.kind)||distance(item,this.point)>=.48) return false;
        if(item.kind!=='back') return true;
        const edges=[
          {distance:item.x,x:-1,z:0},{distance:this.level.width-item.x,x:1,z:0},
          {distance:item.z,x:0,z:-1},{distance:this.level.height-item.z,x:0,z:1}
        ];
        const outward=edges.sort((a,b)=>a.distance-b.distance)[0];
        return move.x*outward.x+move.z*outward.z>.66;
      });
      if (portal) {
        const previousLevel=this.level.id;
        this.interact(portal);
        if (this.level.id!==previousLevel) return;
      }
    }
    this.moving=distance(this.previous,this.point)>.001;
    this.movementSpeed=this.moving?speed:0;
    if (this.moving && !this.dodgeTime) {
      this.stepTime-=distance(this.previous,this.point);
      if (this.stepTime<=0) {this.fx('step');this.stepTime=running?1.42:1.53;}
    }
    if (input.attack) this.charge+=dt;
    if (input.attackUp) {this.strike(this.charge>.48);this.charge=0;}
    else if (!input.attack) this.charge=0;
    if (input.tool) this.useTool();
    if (input.heal) this.heal();
    if (input.shift) this.shift();
    if (input.use) {
      const before=this.level.id;
      this.interact();
      if (this.level.id!==before || this.events.some(event=>['dialogue','shop','smith','choice'].includes(event.type))) return;
    }
    if (this.bomb) {
      this.bomb.time-=dt;
      if (this.bomb.time<=0) {
        const {point,target}=this.bomb;
        this.bomb=null;
        this.fx('bomb',point);
        if(target) this.activateTarget(target);
        for (const foe of this.actors.filter(foe=>distance(foe,point)<2.7 && this.line(point,foe))) this.hurt(foe,foe.spec.weakness===1?5:3,true);
      }
    }
    this.stepEnemies(dt);
    this.saveTime+=dt;
    if (this.saveTime>=18 && !this.dead) {this.saveTime=0;this.save();}
  }
}
