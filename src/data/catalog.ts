export const tools = [
  { name: 'Arco de las Brasas', description: 'Dispara a distancia y perfora los sellos de cuerda.', action: 'Flecha' },
  { name: 'Bombas de Ceniza', description: 'Rompe muros fisurados y golpea a todos los enemigos cercanos.', action: 'Bomba' },
  { name: 'Garfio de Obsidiana', description: 'Alcanza anclajes al otro lado de un abismo y atrae enemigos ligeros.', action: 'Garfio' },
  { name: 'Lámpara de las Almas', description: 'Enciende braseros y revela pasajes ocultos en el Reverso.', action: 'Luz' },
  { name: 'Guantelete de Piedra', description: 'Empuja monolitos y desequilibra guardianes acorazados.', action: 'Empujar' },
  { name: 'Vara de Resonancia', description: 'Canaliza la luz entre prismas y congela al enemigo alcanzado.', action: 'Vara' },
  { name: 'Manto de Sombras', description: 'Atraviesa velos y concede invulnerabilidad durante unos instantes.', action: 'Manto' },
  { name: 'Sello del Eclipse', description: 'Fija recuerdos dispersos y emite un pulso en todas direcciones.', action: 'Pulso' }
] as const;

export type Biome = 'forest' | 'village' | 'plain' | 'ash' | 'marsh' | 'coast' | 'city' | 'garden' | 'reverse' | 'heart';
export const biomes: Record<Biome, { ground: string; trim: number; fog: number; floor: string; music: number[] }> = {
  forest:  { ground: '#303932', trim: 0x9daf73, fog: 0x0f201d, floor: '#4b493a', music: [45,52,57,60,55,52,48,50] },
  village: { ground: '#41362d', trim: 0xe2a562, fog: 0x201716, floor: '#5a4739', music: [48,55,60,62,60,55,53,52] },
  plain:   { ground: '#41422f', trim: 0xc3ad6e, fog: 0x1c1e16, floor: '#54513c', music: [50,57,62,65,64,57,60,55] },
  ash:     { ground: '#483637', trim: 0xe08a68, fog: 0x211718, floor: '#594344', music: [43,50,55,56,55,50,51,46] },
  marsh:   { ground: '#263d37', trim: 0x83c8a4, fog: 0x132421, floor: '#3f5750', music: [44,51,56,59,58,51,54,49] },
  coast:   { ground: '#313c49', trim: 0x89bdd8, fog: 0x111d29, floor: '#48555f', music: [42,49,54,57,56,49,52,47] },
  city:    { ground: '#3f3445', trim: 0xd3a5ca, fog: 0x1b1525, floor: '#5a4659', music: [46,53,58,61,60,53,56,51] },
  garden:  { ground: '#383d37', trim: 0xc9cb88, fog: 0x17221c, floor: '#555747', music: [47,54,59,62,61,54,57,52] },
  reverse: { ground: '#37334c', trim: 0xb3a0ed, fog: 0x181226, floor: '#514862', music: [41,48,53,56,55,48,51,46] },
  heart:   { ground: '#492e3b', trim: 0xf99895, fog: 0x231219, floor: '#62424d', music: [40,47,52,55,54,47,50,45] }
};

export type EnemyStyle = 'fang' | 'wisp' | 'knight' | 'eye' | 'crawler' | 'automaton' | 'mask' | 'star';
export type Pattern = 'lunge' | 'bolt' | 'guard' | 'burst' | 'orbit' | 'sweep' | 'volley' | 'pulse';
export interface EnemySpec {
  name: string; style: EnemyStyle; pattern: Pattern; hue: string;
  hp: number; speed: number; reach: number; warning: number; damage: number;
  weakness: number; boss?: boolean;
}
export const enemies: readonly EnemySpec[] = [
  { name:'Lobo de espino',style:'fang',pattern:'lunge',hue:'#c89769',hp:3,speed:2.35,reach:2.2,warning:.49,damage:1,weakness:0 },
  { name:'Ánima de polen',style:'wisp',pattern:'bolt',hue:'#f0d484',hp:2,speed:1.3,reach:5.3,warning:.72,damage:1,weakness:3 },
  { name:'Penitente de sal',style:'knight',pattern:'guard',hue:'#80b7be',hp:5,speed:1.52,reach:1.6,warning:.68,damage:1,weakness:4 },
  { name:'Ojo de la ciénaga',style:'eye',pattern:'orbit',hue:'#7ee2b2',hp:3,speed:1.8,reach:4.5,warning:.61,damage:1,weakness:0 },
  { name:'Cangrejo de escoria',style:'crawler',pattern:'burst',hue:'#e5856a',hp:4,speed:1.92,reach:2.1,warning:.74,damage:1,weakness:1 },
  { name:'Polea viviente',style:'automaton',pattern:'sweep',hue:'#dda36e',hp:4,speed:1.38,reach:2.6,warning:.79,damage:1,weakness:2 },
  { name:'Ujier sin rostro',style:'mask',pattern:'volley',hue:'#e8a3ce',hp:3,speed:1.68,reach:5.0,warning:.64,damage:1,weakness:3 },
  { name:'Satélite hueco',style:'star',pattern:'pulse',hue:'#b197f5',hp:4,speed:1.75,reach:3.5,warning:.81,damage:1,weakness:5 },
  { name:'Galgo de ceniza',style:'fang',pattern:'orbit',hue:'#e8ab8a',hp:4,speed:2.15,reach:3.3,warning:.57,damage:1,weakness:1 },
  { name:'Llave errante',style:'automaton',pattern:'bolt',hue:'#e1c998',hp:3,speed:1.23,reach:5.2,warning:.67,damage:1,weakness:5 },
  { name:'Caballero del revés',style:'knight',pattern:'lunge',hue:'#a798e9',hp:5,speed:1.87,reach:2.35,warning:.57,damage:1,weakness:6 },
  { name:'Larva del eclipse',style:'crawler',pattern:'pulse',hue:'#ef8ba2',hp:3,speed:1.64,reach:2.9,warning:.7,damage:1,weakness:7 }
];
export const bosses: readonly EnemySpec[] = [
  { name:'El Ciervo de los Nudos',style:'fang',pattern:'lunge',hue:'#f0ad72',hp:12,speed:2.05,reach:3.0,warning:.83,damage:1,weakness:0,boss:true },
  { name:'La Abadesa de Sal',style:'wisp',pattern:'volley',hue:'#a3e1d6',hp:15,speed:1.4,reach:6,warning:.91,damage:1,weakness:1,boss:true },
  { name:'El Capataz de Bronce',style:'automaton',pattern:'sweep',hue:'#f5a65f',hp:18,speed:1.7,reach:3.2,warning:.95,damage:2,weakness:2,boss:true },
  { name:'La Reina de los Rostros',style:'mask',pattern:'orbit',hue:'#ffd1d9',hp:19,speed:1.7,reach:5.6,warning:.81,damage:2,weakness:3,boss:true },
  { name:'El Jardinero Dormido',style:'knight',pattern:'burst',hue:'#dce696',hp:21,speed:1.57,reach:3.3,warning:.98,damage:2,weakness:4,boss:true },
  { name:'La Aguja de Vidrio',style:'eye',pattern:'bolt',hue:'#9cdaff',hp:22,speed:1.93,reach:6.4,warning:.82,damage:2,weakness:5,boss:true },
  { name:'El Otro Testigo',style:'knight',pattern:'guard',hue:'#cbb4ff',hp:24,speed:2.18,reach:2.5,warning:.86,damage:2,weakness:6,boss:true },
  { name:'Sol sin Nombre',style:'star',pattern:'pulse',hue:'#ffb389',hp:28,speed:1.85,reach:4.7,warning:.97,damage:2,weakness:7,boss:true }
];
