import { expect, test } from 'vitest';
import { Game, neutral, type Controls } from '../src/core/game';
import { distance, vector } from '../src/core/geometry';
import { slashRotation } from '../src/rendering/combat-effects';
import { Vector3 } from 'three';
import { fresh, readSave } from '../src/core/state';
import { dungeonRegions, dungeons, levels, regions, route, type LevelObject, type Point } from '../src/data/levels';

const frame=1/60;
function tick(game:Game, controls:Partial<Controls>={}) {
  game.step(frame,{...neutral,...controls});
}
function wait(game:Game,frames:number) {
  for(let i=0;i<frames;i++) tick(game);
}
const object=(game:Game,kind:string,marker?:string)=>game.level.objects.find(item=>item.kind===kind&&(!marker||item.marker===marker))!;
const adjacent=[{x:1,z:0},{x:0,z:1},{x:-1,z:0},{x:0,z:-1}];
const cell=(p:Point)=>({x:Math.floor(p.x)+.5,z:Math.floor(p.z)+.5});
const id=(p:Point)=>p.x+','+p.z;

function path(game:Game,to:Point,within:number) {
  const start=cell(game.point);
  const queue:[Point,Point[]][]=[[start,[]]];
  const seen=new Set([id(start)]);
  for(let i=0;i<queue.length;i++){
    const [here,way]=queue[i];
    if(distance(here,to)<=within) return way;
    for(const offset of adjacent) {
      const point={x:here.x+offset.x,z:here.z+offset.z};
      if(seen.has(id(point))||game.isBlocked(point)) continue;
      seen.add(id(point));queue.push([point,[...way,point]]);
    }
  }
  throw new Error('Sin ruta en '+game.level.id+' hacia '+id(to)+' desde '+id(game.point));
}

function walk(game:Game,to:Point,within=.24) {
  for(let tries=0;tries<15;tries++){
    if(distance(game.point,to)<=within) return;
    const way=path(game,to,within);
    for(const waypoint of (way.length?way:[cell(game.point)])){
      for(let i=0;i<30&&distance(game.point,waypoint)>.095;i++){
        if(game.dead) throw new Error('Derrota en '+game.level.id+' yendo hacia '+id(to));
        const delta=vector(game.point,waypoint);
        const hazard=game.actors.find(actor=>actor.hp>0&&!actor.spec.boss&&distance(actor,game.point)<1.55);
        if(hazard&&i%9===0){
          const aim=vector(game.point,hazard);
          tick(game,{...aim,attackUp:true,heal:game.state.hp<=2});
        }else tick(game,{...delta,heal:game.state.hp<=2});
        if(distance(game.point,to)<=within) return;
      }
    }
  }
  throw new Error('No llegó a '+id(to)+' en '+game.level.id+' desde '+id(game.point));
}
function use(game:Game,item:LevelObject,within=.26) {
  const portal=['entrance','next','back'].includes(item.kind);
  const start=game.level.id;
  if(portal) {
    const target=item.kind==='entrance'?'d'+(game.level.dungeon?game.level.index:regions[game.level.index].dungeon):item.kind==='back'&&game.level.dungeon
      ?'r'+dungeonRegions[game.level.index]:item.kind==='next'
      ?'r'+route[route.indexOf(game.level.index)+1]
      :'r'+route[route.indexOf(game.level.index)-1];
    if(item.kind==='back'){
      const edges=[
        {distance:item.x,x:-1,z:0},{distance:game.level.width-item.x,x:1,z:0},
        {distance:item.z,x:0,z:-1},{distance:game.level.height-item.z,x:0,z:1}
      ];
      const outward=edges.sort((a,b)=>a.distance-b.distance)[0];
      walk(game,{x:item.x-outward.x*1.2,z:item.z-outward.z*1.2},.3);
      for(let frame=0;frame<65&&game.level.id===start;frame++) tick(game,{x:outward.x,z:outward.z});
    }
    for(let tries=0;tries<20&&game.level.id===start;tries++){
      const near=path(game,item,.3);
      for(const point of near){
        for(let frame=0;frame<30&&game.level.id===start&&distance(game.point,point)>.10;frame++)
          tick(game,{...vector(game.point,point),heal:game.state.hp<=2});
      }
      if(game.level.id===start) tick(game,{...vector(game.point,item)});
    }
    expect(game.level.id,'portal '+item.kind+' desde '+start).toBe(target);
    return;
  }
  walk(game,item,within);
  expect(game.nearest()?.id,'interacción '+item.kind+' en '+game.level.id).toBe(item.id);
  game.events=[];
  tick(game,{use:true});
}
function realm(game:Game,target:number){
  if(game.state.realm===target) return;
  wait(game,35);
  tick(game,{shift:true});
  expect(game.state.realm).toBe(target);
}

function conquer(game:Game,index:number){
  expect(game.level.id).toBe('d'+index);
  use(game,object(game,'tool'));
  expect(game.state.tools).toContain(index);
  expect(game.state.tool).toBe(index);
  expect(game.events.some(event=>event.type==='dialogue')).toBe(true);
  if(index===1) realm(game,1);
  use(game,object(game,'chest'));
  for(const position of dungeons[index].order) {
    realm(game,dungeons[index].layers[position]!);
    const target=object(game,'target',String(position+1));
    if(index===2 && position===1) walk(game,{x:12.5,z:8.5});
    else if(index===4) walk(game,{x:target.x,z:target.z+1});
    else walk(game,target,index===0?2.2:index===2?2.15:.32);
    wait(game,22);
    tick(game,{tool:true});
    if(index===1) wait(game,28);
    expect(game.state.flags[target.id],'puzle '+index+':'+position+' desde '+id(game.point)).toBe(true);
  }
  realm(game,0);
  use(game,object(game,'key'));
  const gate=object(game,'gate');
  use(game,gate,1.16);
  expect(game.gateOpen).toBe(true);
  const boss=game.actors.find(actor=>actor.spec.boss)!;
  walk(game,{x:10.5,z:3.5});
  for(let i=0;i<980&&boss.hp>0;i++){
    if(game.dead) throw new Error('Derrota en jefe '+index+' al fotograma '+i+' con vida rival '+boss.hp);
    const aim=vector(game.point,boss);
    const approach=distance(game.point,boss)>1.34;
    const useTool=i%31===0;
    const attackUp=i%16===3;
    if(useTool||attackUp) game.facing=aim;
    tick(game,{...(approach?aim:{x:0,z:0}),tool:useTool,attackUp,heal:game.state.hp<=3,
      block:boss.wind>0&&boss.wind<.23&&!useTool&&!attackUp,dodge:boss.wind>0&&boss.wind<.09&&i%4===0});
  }
  expect(boss.hp).toBeLessThanOrEqual(0);
  expect(game.state.bosses).toEqual(Array.from({length:index+1},(_,i)=>i));
  expect(game.events.some(event=>event.type==='dialogue')).toBe(true);
}

test.each(['story','normal'] as const)('campaña completa en %s, ocho jefes y tres desenlaces',difficulty=>{
  const game=new Game(fresh(),difficulty);
  expect(game.level.id).toBe('r0');
  use(game,object(game,'quest'));
  use(game,object(game,'entrance'));
  conquer(game,0);
  use(game,object(game,'back'));
  use(game,object(game,'next'));
  expect(game.level.id).toBe('r1');
  use(game,object(game,'npc'));
  expect(game.state.quests.letter).toBe('done');
  use(game,object(game,'merchant'));
  expect(game.events.some(event=>event.type==='shop')).toBe(true);
  expect(game.buy('tonic')).toBe(true);
  use(game,object(game,'smith'));
  expect(game.events.some(event=>event.type==='smith')).toBe(true);
  expect(game.buy('weapon')).toBe(true);
  for (const [position,index] of route.entries()){
    if(position<2) continue;
    use(game,object(game,'next'));
    expect(game.level.id).toBe('r'+index);
    if(index===4){
      realm(game,1);use(game,object(game,'quest'));realm(game,0);
    }
    if(index===7) use(game,object(game,'quest'));
    if(index===2) continue;
    use(game,object(game,'entrance'));
    conquer(game,game.level.index);
    if(index!==9) use(game,object(game,'back'));
  }
  expect(game.canWeave).toBe(false);
  walk(game,{x:10.5,z:2.5});
  tick(game,{use:true});
  expect(game.events.some(event=>event.type==='choice')).toBe(true);
  game.finish('weave');
  expect(game.state.ending).toBeUndefined();
  const beforeEnd=readSave(JSON.parse(JSON.stringify(game.state)));
  game.finish('dawn');
  expect(game.state.ending).toBe('dawn');
  const alternate=new Game(beforeEnd,difficulty);
  alternate.finish('keep');
  expect(alternate.state.ending).toBe('keep');
  use(game,object(game,'back'));
  for(let i=0;i<8;i++) use(game,object(game,'back'));
  expect(game.level.id).toBe('r1');
  use(game,object(game,'smith'));
  expect(game.state.quests.seed).toBe('done');
  realm(game,1);
  use(game,object(game,'npc'));
  expect(game.state.quests.names).toBe('done');
  expect(game.canWeave).toBe(true);
  realm(game,0);
  for(let i=0;i<8;i++) use(game,object(game,'next'));
  use(game,object(game,'entrance'));
  walk(game,{x:10.5,z:2.5});
  game.finish('weave');
  expect(game.state.ending).toBe('weave');
  expect(new Game(readSave(JSON.parse(JSON.stringify(game.state)))).state.ending).toBe('weave');
});

test('movimiento avanza y las colisiones bloquean el muro',()=>{
  const game=new Game(fresh());
  const start={...game.point};
  for(let i=0;i<60;i++) tick(game,{x:1});
  expect(game.point.x).toBeGreaterThan(start.x+.5);
  expect(game.movementSpeed).toBe(4.85);
  tick(game,{x:1,run:true});
  expect(game.movementSpeed).toBe(6.4);
  const edge={x:game.level.width-.2,z:game.point.z};
  expect(game.isBlocked(edge)).toBe(true);
});

test('mapas cerrados, un portal funcional en cada extremo y un jefe por mazmorra',()=>{
  expect(levels.size).toBe(18);
  for(const level of levels.values()){
    expect(level.cells[0]).toMatch(/^#+$/);
    expect(level.cells.at(-1)).toMatch(/^#+$/);
    for(const row of level.cells) {
      expect(row).toMatch(/^#.*#$/);
      expect(row.length,'ancho de '+level.id+' fila '+row).toBe(level.width);
    }
    if(level.dungeon){
      for(const kind of ['boss','back','tool','key','gate','chest']) expect(level.objects.filter(item=>item.kind===kind)).toHaveLength(1);
      expect(level.objects.filter(item=>item.kind==='target')).toHaveLength(dungeons[level.index].order.length);
    }
  }
});

test('movimiento diagonal normalizado, colisión y Resonancia bloqueada',()=>{
  const game=new Game(fresh());
  const start={...game.point};
  tick(game,{x:1,z:1});
  expect(distance(start,game.point)).toBeCloseTo(4.85/60);
  for(let i=0;i<150;i++) tick(game,{x:-1});
  expect(game.point.x).toBeGreaterThanOrEqual(1.23);
  expect(game.point.x).toBeLessThan(1.34);
  expect(game.shift()).toBe(false);
  expect(game.state.realm).toBe(0);
});

test('derrota y reaparición sin perder reliquias',()=>{
  const game=new Game(fresh(),'hard');
  const actor=game.actors[0];
  game.state.hp=1;
  game.state.position={x:actor.x+.62,z:actor.z};
  game.state.tools=[0];
  game.equip(0);
  wait(game,150);
  expect(game.dead).toBe(true);
  game.respawn();
  expect(game.dead).toBe(false);
  expect(game.state.hp).toBe(game.state.maxHp);
  expect(game.state.tools).toEqual([0]);
  expect(game.point).toEqual(game.level.spawn);
});

test('la guardia consume resistencia y puede contraatacar',()=>{
  const game=new Game(fresh());
  const actor=game.actors[0];
  game.state.position={x:actor.x+.81,z:actor.z};
  game.facing={x:-1,z:0};
  for(let i=0;i<115;i++) tick(game,{block:true});
  expect(game.state.hp).toBe(game.state.maxHp);
  expect(game.events.some(event=>event.type==='fx'&&event.kind==='block')).toBe(true);
  expect(actor.hp).toBeLessThan(actor.spec.hp);
});

test('una herramienta equipada se valida y una compra no puede endeudar',()=>{
  const game=new Game(fresh());
  game.equip(7);
  expect(game.state.tool).toBe(-1);
  expect(game.buy('armor')).toBe(false);
  expect(game.state.gold).toBe(0);
  expect(game.state.armor).toBe(0);
});

test('hogueras recuerdan regiones visitadas y solo permiten viajar desde un punto de descanso',()=>{
  const game=new Game({...fresh(),bosses:[0,1,2],tools:[0,1,2]});
  expect(game.fastTravel(4)).toBe(false);
  game.travel('r4','shrine');
  expect(game.canFastTravel).toBe(true);
  expect(game.fastTravel(9)).toBe(false);
  expect(game.fastTravel(0)).toBe(true);
  expect(game.level.id).toBe('r0');
  expect(game.point).toEqual(expect.objectContaining({x:11.5,z:10.5}));
  expect(readSave(game.state).flags['visit:r4']).toBe(true);
});


test.each([
  [{x:0,z:-1}],
  [{x:1,z:0}],
  [{x:0,z:1}],
  [{x:-1,z:0}],
  [{x:Math.SQRT1_2,z:-Math.SQRT1_2}],
  [{x:Math.SQRT1_2,z:Math.SQRT1_2}],
  [{x:-Math.SQRT1_2,z:Math.SQRT1_2}],
  [{x:-Math.SQRT1_2,z:-Math.SQRT1_2}],
])('el arco de espada apunta hacia delante para la dirección %o',facing=>{
  const midpoint=Math.PI*.605;
  const direction=new Vector3(Math.cos(midpoint),Math.sin(midpoint),0)
    .applyEuler(slashRotation(facing));
  const expected=new Vector3(facing.x,0,facing.z).normalize();
  expect(direction.x).toBeCloseTo(expected.x,6);
  expect(direction.z).toBeCloseTo(expected.z,6);
});

test('la Catedral pide cruzar en el Reverso y abre un atajo persistente',()=>{
  const game=new Game({...fresh(),level:'d1',position:{x:10.5,z:13.5},bosses:[0],tools:[0,1],tool:1});
  const bridge={x:10.5,z:12.5};
  const shortcut={x:17.5,z:12.5};
  expect(game.isBlocked(bridge)).toBe(true);
  expect(game.isBlocked(shortcut)).toBe(true);
  realm(game,1);
  expect(game.isBlocked(bridge)).toBe(false);
  expect(game.isBlocked(shortcut)).toBe(true);
  walk(game,bridge);
  expect(game.shift()).toBe(false);
  walk(game,{x:10.5,z:11.5});
  realm(game,0);
  use(game,object(game,'key'));
  const gate=object(game,'gate');
  use(game,gate,1.16);
  expect(game.gateOpen).toBe(false);
  for (const target of game.level.objects.filter(item=>item.kind==='target')) game.state.flags[target.id]=true;
  use(game,gate,1.16);
  expect(game.isBlocked(shortcut)).toBe(false);
  expect(new Game(readSave(game.state)).isBlocked(shortcut)).toBe(false);
});

test('los enemigos avisan antes de atacar y no reaparecen al volver del Reverso',()=>{
  const game=new Game({...fresh(),bosses:[0],tools:[0]});
  const enemy=game.actors.find(actor=>actor.spec.pattern==='lunge')!;
  game.state.position={x:enemy.x+.7,z:enemy.z};
  game.facing=vector(game.point,enemy);
  tick(game);
  expect(enemy.alert).toBeGreaterThan(0);
  expect(game.events.some(event=>event.type==='fx'&&event.kind==='notice')).toBe(true);
  wait(game,25);
  expect(enemy.wind).toBe(0);
  expect(game.state.hp).toBe(game.state.maxHp);
  tick(game,{attackUp:true});
  wait(game,19);
  tick(game,{attackUp:true});
  expect(enemy.hp).toBeLessThanOrEqual(0);
  const gold=game.state.gold;
  realm(game,1);
  realm(game,0);
  expect(game.actors.find(actor=>actor.id===enemy.id)?.hp).toBe(enemy.hp);
  expect(game.state.gold).toBe(gold);
});

test('el ataque conserva su dirección inicial si Eira gira durante el efecto',()=>{
  const game=new Game(fresh());
  tick(game,{attackUp:true,x:1});
  const slash=game.events.find(event=>event.type==='fx'&&event.kind==='slash');
  tick(game,{z:1});
  expect(game.facing).toEqual({x:0,z:1});
  expect(slash).toMatchObject({facing:{x:1,z:0}});
});


test('recompensas de armas, equipamiento y estilos afectan al combate',()=>{
  const game=new Game({...fresh(),level:'d1',position:{x:10.5,z:10.5},bosses:[0],tools:[0,1]});
  use(game,object(game,'chest'));
  expect(game.state.foundWeapons).toEqual([0,1]);
  expect(game.equipWeapon(2)).toBe(false);
  expect(game.equipWeapon(1)).toBe(true);
  game.travel('r0');
  const foe=game.actors.find(actor=>!actor.spec.boss)!;
  game.state.position={x:foe.x+.9,z:foe.z};
  game.facing={x:-1,z:0};
  foe.aware=true;foe.wind=.4;
  tick(game,{attackUp:true});
  expect(foe.wind).toBe(0);
  expect(foe.hp).toBeLessThanOrEqual(0);
  expect(readSave(JSON.parse(JSON.stringify(game.state))).weaponStyle).toBe(1);
});

test('las partidas anteriores mantienen la espada inicial',()=>{
  const old={...fresh(),weaponStyle:undefined,foundWeapons:undefined};
  expect(readSave(old)).toMatchObject({weaponStyle:0,foundWeapons:[0]});
});
