import type { Game } from '../core/game';
import { regions, route, entryRequirements, tile } from '../data/levels';

export function mapHtml(game:Game) {
  const {level,state}=game;
  const diagram=Array.from({length:level.height},(_,z)=>Array.from({length:level.width},(_,x)=>{
    const code=tile(level,x+.5,z+.5,state.realm,game.gateOpen);
    const player=Math.floor(game.point.x)===x && Math.floor(game.point.z)===z;
    return '<i class="'+(player?'you':(code==='#'||code==='G'&&!game.gateOpen)?'wall':code==='~'?'water':'floor')+'"></i>';
  }).join('')).join('');
  return `<p class="eyebrow">${level.dungeon?'Plano de la mazmorra':'Mapa de la región'}</p><h2>${level.name}</h2>
    <div class="cartography" role="img" aria-label="Plano de ${level.name}. Tu posición está marcada en dorado." style="--columns:${level.width}">${diagram}</div>
    <p class="map-legend">◆ Tu posición <span>▦ Muros</span> <span>≋ Agua</span></p>
    ${game.canFastTravel?`<h3>Viaje por las hogueras</h3><div class="travel-list">${route.filter(index=>index!==level.index&&state.flags['visit:r'+index]).map(index=>
      `<button type="button" data-action="travel:${index}">${regions[index].name}</button>`).join('')}</div>`:''}
    <h3>Ruta de Vaeloria</h3>
    <ol class="world-route">${route.map(index=>`<li class="${state.bosses.length<entryRequirements[index]?'locked':''}">${regions[index].name}${index===level.index&&!level.dungeon?' <small>Estás aquí</small>':''}</li>`).join('')}</ol>`;
}
