import { levels, type Point } from '../data/levels';
import type { Ending, QuestId } from '../data/story';

export interface SaveState {
  version:2;
  level:string;
  position:Point;
  realm:0|1;
  hp:number;
  maxHp:number;
  gold:number;
  tonics:number;
  weapon:number;
  weaponStyle:number;
  foundWeapons:number[];
  armor:number;
  tool:number;
  tools:number[];
  bosses:number[];
  flags:Record<string,true>;
  quests:Partial<Record<QuestId,'found'|'done'>>;
  ending?:Ending;
}
export function fresh():SaveState {
  return {version:2,level:'r0',position:{...levels.get('r0')!.spawn},realm:0,hp:6,maxHp:6,gold:0,tonics:2,
    weapon:0,weaponStyle:0,foundWeapons:[0],armor:0,tool:-1,tools:[],bosses:[],flags:{'visit:r0':true},quests:{}};
}

function object(value:unknown):value is Record<string,unknown> {
  return !!value && typeof value==='object' && !Array.isArray(value);
}
function integer(value:unknown,min:number,max:number):value is number {
  return typeof value==='number' && Number.isInteger(value) && value>=min && value<=max;
}
function numberList(value:unknown):value is number[] {
  return Array.isArray(value) && value.every(item=>integer(item,0,7)) && new Set(value).size===value.length;
}
const validFlags=new Set<string>();
for (const level of levels.values()) {
  if(!level.dungeon) validFlags.add('visit:'+level.id);
  for (const item of level.objects) {
    if (['key','gate','target','chest','inscription'].includes(item.kind)) validFlags.add(item.id);
  }
}
validFlags.add('secret:r0');

export function readSave(raw:unknown):SaveState {
  if (!object(raw)) throw new Error('Archivo de partida inválido.');
  const migrated=(raw.version===1 || raw.version===2 && typeof raw.armor!=='number') ? {...raw,version:2,armor:0,quests:raw.quests ?? {}} : raw;
  const data=migrated.version===2 ? {...migrated,weaponStyle:migrated.weaponStyle??0,foundWeapons:migrated.foundWeapons??[0]} : migrated;
  if (data.version!==2 || typeof data.level!=='string') throw new Error('Versión de partida incompatible.');
  const level=levels.get(data.level);
  if (!level || !object(data.position) || typeof data.position.x!=='number' || typeof data.position.z!=='number' ||
      !Number.isFinite(data.position.x) || !Number.isFinite(data.position.z) ||
      data.position.x<0 || data.position.x>=level.width || data.position.z<0 || data.position.z>=level.height ||
      !integer(data.realm,0,1) || !integer(data.maxHp,6,20) || !integer(data.hp,0,data.maxHp) ||
      !integer(data.weaponStyle,0,3) || !Array.isArray(data.foundWeapons) ||
      !data.foundWeapons.every((item:unknown)=>integer(item,0,3)) || !data.foundWeapons.includes(0) ||
      !data.foundWeapons.includes(data.weaponStyle) || new Set(data.foundWeapons).size!==data.foundWeapons.length ||
      !integer(data.gold,0,99999) || !integer(data.tonics,0,99) || !integer(data.weapon,0,2) || !integer(data.armor,0,1) ||
      !integer(data.tool,-1,7) || !numberList(data.tools) || !numberList(data.bosses) ||
      (data.tool>=0 && !data.tools.includes(data.tool)) || !object(data.flags) || !object(data.quests)) {
    throw new Error('La partida contiene valores dañados.');
  }
  if (!data.bosses.every((boss,index)=>boss===index&&data.tools instanceof Array&&data.tools.includes(boss)) ||
      (data.ending!==undefined && data.bosses.length!==8) ||
      !Object.entries(data.flags).every(([key,value])=>validFlags.has(key) && value===true) ||
      !Object.entries(data.quests).every(([key,value])=>['letter','names','seed'].includes(key) && (value==='found'||value==='done')) ||
      (data.ending!==undefined && data.ending!=='dawn' && data.ending!=='keep' && data.ending!=='weave')) {
    throw new Error('El progreso de la partida está dañado.');
  }
  const {position,realm,hp,maxHp,gold,tonics,weapon,weaponStyle,foundWeapons,armor,tool,tools,bosses,flags,quests,ending}=data;
  return {version:2,level:level.id,position:{x:position.x as number,z:position.z as number},realm:realm===1?1:0,hp,maxHp,gold,tonics,weapon,weaponStyle,foundWeapons:[...foundWeapons],armor,tool,
    tools:[...tools],bosses:[...bosses],flags:{...flags} as SaveState['flags'],quests:{...quests} as SaveState['quests'],ending};
}
