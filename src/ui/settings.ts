import { bindings, type Bindings } from '../input/controls';
import { defaultVolumes, type Volumes } from '../audio/score';
import type { Quality } from '../rendering/scene';
import type { Difficulty } from '../core/game';

export interface Settings {
  quality:Quality;
  difficulty:Difficulty;
  reduced:boolean;
  contrast:boolean;
  large:boolean;
  volumes:Volumes;
  bindings:Bindings;
}

export function getSettings():Settings {
  const defaults:Settings={quality:window.matchMedia('(pointer: coarse)').matches?'medium':'high',
    difficulty:'normal',reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,contrast:false,large:false,
    volumes:{...defaultVolumes},bindings:{...bindings}};
  try{
    const saved=JSON.parse(localStorage.getItem('eclipse-settings')??'null');
    if(!saved || typeof saved!=='object') return defaults;
    if (['low','medium','high'].includes(saved.quality)) defaults.quality=saved.quality;
    if (['story','normal','hard'].includes(saved.difficulty)) defaults.difficulty=saved.difficulty;
    for(const flag of ['reduced','contrast','large'] as const) if(typeof saved[flag]==='boolean') defaults[flag]=saved[flag];
    for(const name of Object.keys(defaultVolumes) as Array<keyof Volumes>){
      const value=saved.volumes?.[name];
      if(typeof value==='number'&&Number.isFinite(value)) defaults.volumes[name]=Math.max(0,Math.min(1,value));
    }
    for(const key of Object.keys(bindings) as Array<keyof Bindings>){
      const value=saved.bindings?.[key];
      if(typeof value==='string'&&/^[A-Za-z0-9]{2,32}$/.test(value)) defaults.bindings[key]=value;
    }
  }catch{/* Defaults remain available if storage is blocked. */}
  return defaults;
}

export function keepSettings(settings:Settings) {
  try {localStorage.setItem('eclipse-settings',JSON.stringify(settings));}
  catch {/* Settings still apply for the active session. */}
}
