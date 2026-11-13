import type { Biome } from './catalog';

export const regions = [
  { name:'Bosque de los Susurros', biome:'forest', subtitle:'El umbral de Vaeloria', dungeon:0, enemy:[0,1], map:`
#######################
#..T....T.......T.....#
#....T.....E......T...#
#..H....T.....C.......#
#....TT....T......N.A.#
#..........T...T......#
#..T......E....~~~~~..#
#.....T.......~~~=~~..#
#..S......E..T~~~~~...#
#....T.......T........#
#.....T....F......X...#
#.................T...#
#######################` },
  { name:'Aldea de las Últimas Brasas', biome:'village', subtitle:'Donde los nombres aún importan', dungeon:-1, enemy:[], map:`
#######################
#....##.........##....#
#....##...T.....##....#
#....N...........M....#
#..........A..........#
#..P...............X..#
#...F....T....T.......#
#......T............#.#
#....S......V.........#
#..T......##......T...#
#.........##..........#
#######################` },
  { name:'Llanuras del Sol Caído', biome:'plain', subtitle:'Aquí aterrizó la primera sombra', dungeon:-1, enemy:[8,9], map:`
#######################
#.....TT...........C..#
#....T...E.....T......#
#..T...........TT..I..#
#......~~......T...N..#
#....~~~~=~~~......A..#
#..P...~~~~..E.....X..#
#......~~~........T...#
#..S..........TT......#
#.......E..........T..#
#...F.........T.......#
#######################` },
  { name:'Montañas de Ceniza', biome:'ash', subtitle:'El canto del metal enfermo', dungeon:2, enemy:[5,8], map:`
#######################
#....#...E..T....A....#
#....#....##..........#
#.............#..N....#
#..###...T....#.......#
#.......###...#....X..#
#..P..........#.......#
#.......E.......##....#
#..S...##...F..E......#
#....T....T........C..#
#######################` },
  { name:'Pantanos de las Voces', biome:'marsh', subtitle:'Las palabras flotan sobre la turba', dungeon:1, enemy:[3,1], map:`
#######################
#.......E..~~~....H...#
#..~~~~~...~~...T.....#
#..~~==~..~~~.....N.A.#
#..~~~~...~...E.......#
#.......T.~..~~~~.....#
#..P......~..~===..X..#
#.....E......~~~~.....#
#..S.....~~......T....#
#......F..~~~....C....#
#######################` },
  { name:'Costa del Cristal Negro', biome:'coast', subtitle:'El mar devuelve la luz rota', dungeon:5, enemy:[4,3], map:`
#######################
#~~~~~.......~.....IC.#
#~~=~~.T..T..~....N...#
#~~~~~.......~......A.#
#........E......##....#
#....##.....T....#....#
#..P..#..F..~......X..#
#.....#.....~.E.......#
#..S......E.~~~~...T..#
#...........~~~~......#
#######################` },
  { name:'Ciudad de las Máscaras', biome:'city', subtitle:'Ciudadanos de la penúltima noche', dungeon:3, enemy:[6,9], map:`
#######################
#.......#...........A.#
#..###..#...##........#
#...........##....N...#
#...E....T..........C.#
#..###.......E...##...#
#..P......#......##X..#
#.........#....T......#
#..S..F......E........#
#.............##......#
#######################` },
  { name:'Jardines de los Gigantes', biome:'garden', subtitle:'Un sueño bajo la piedra', dungeon:4, enemy:[2,5], map:`
#######################
#......T....TT.......H#
#..T..T........T......#
#......E.....T....N.A.#
#....TT....~~~........#
#.........~~=~~.T.....#
#..P...T..~~~......X..#
#......T....E.........#
#..S....F........TT...#
#.......E.......C.....#
#######################` },
  { name:'Reino Invertido', biome:'reverse', subtitle:'El agua sube hacia sus muertos', dungeon:6, enemy:[10,7], map:`
#######################
#..T.....I#......T....#
#.....E...#....E....A.#
#...~~~~~~#..T........#
#...~~===~....N....C..#
#......T.....###......#
#..P...............X..#
#........#.....E......#
#..S.....#...T........#
#....F...#............#
#######################` },
  { name:'Corazón del Eclipse', biome:'heart', subtitle:'La primera y última mañana', dungeon:7, enemy:[11,7], map:`
#######################
#......E..............#
#....#....T.....#...A.#
#....#....T.....#.....#
#..........N..........#
#......#.......#......#
#..P...#...E...#......#
#........T...T........#
#..S..............C...#
#.......F......E......#
#######################` }
] as const satisfies readonly { name:string; biome:Biome; subtitle:string; dungeon:number; enemy:readonly number[]; map:string }[];

export const route = [0,1,2,4,3,6,7,5,8,9];
export const entryRequirements = [0,1,1,2,1,5,3,4,6,7];
export const dungeonRegions = [0,4,3,6,7,5,8,9];

export const dungeons = [
  { name:'Santuario de las Raíces', subtitle:'El guardián del primer nudo', hint:'Desde el mosaico, dispara a las dos cuerdas. El arco funciona hasta seis pasos.', targets:['Cuerda del oeste','Cuerda del este'], layers:[0,0], order:[0,1], map:`
#####################
#......T.....T......#
#.........J.........#
#......T.....T......#
##########G##########
#...1...........2...#
#.........K.........#
#......#.....#......#
#...E...........E...#
#...###.......###...#
#...U.....S.........#
#...T.....P......C..#
#####################` },
  { name:'Catedral Sumergida', subtitle:'Las campanas suenan bajo el agua', hint:'Recoge las bombas en la sacristía. Vuelve al embarcadero y cambia al Reverso para cruzar el puente de agua. Derrumba primero la costra del coro en Brasas y luego la costra sumergida en el Reverso.', targets:['Costra del coro','Costra sumergida'], layers:[0,1], order:[0,1], map:`
#####################
#........J..........#
#...T...........T...#
#...~~.........~~...#
##########G##########
#..2.....K......1...#
#..~~~.......~~~....#
#..~~...E....~==....#
#.................E.#
#....###....###.....#
#...................#
#..C................#
#########===#####L###
#...................#
#......#....#.......#
#......#....####....#
#..B...#........U...#
#..........S.P......#
#####################` },
  { name:'Minas del Sol Muerto', subtitle:'En la veta palpita un recuerdo', hint:'Engancha primero la argolla lejana desde el borde del corte. Regresa por la pasarela del oeste y engancha la otra.', targets:['Argolla del retorno','Argolla sobre el vacío'], layers:[0,0], order:[1,0], map:`
#####################
#......T.....T......#
#.........J.........#
#....#........#.....#
##########G##########
#....K......2.......#
#......~~~~~~~......#
#..1...~~~~~~~......#
#....E....T......E..#
#...#............#..#
#...#...U.S......#..#
#..C......P.........#
#####################` },
  { name:'Palacio de las Máscaras', subtitle:'Los rostros esperan a su dueña', hint:'Enciende los braseros por orden. El segundo espera al otro lado del velo.', targets:['Brasero del umbral','Brasero del velo','Brasero del trono'], layers:[0,1,0], order:[0,1,2], map:`
#####################
#...T...........T...#
#.........J.........#
#......T.....T......#
##########G##########
#...3.....K.........#
#...#..#.....#..#...#
#..E......2.......E.#
#......#.....#......#
#...1......U........#
#......C..S.........#
#.........P.........#
#####################` },
  { name:'Jardín del Gigante Dormido', subtitle:'Los monolitos guardan su sueño', hint:'Empuja los monolitos desde el sur hacia sus encajes. Empieza por el del Reverso.', targets:['Monolito musgoso','Monolito sin sombra'], layers:[0,1], order:[1,0], map:`
#####################
#..T.............T..#
#.........J.........#
#...................#
##########G##########
#....1....K.....2...#
#....T.........T....#
#.........E.........#
#..T....~~==~....T..#
#.....E.............#
#..C......S.....U...#
#.........P.........#
#####################` },
  { name:'Fortaleza del Cristal Negro', subtitle:'Los prismas beben luz del cielo', hint:'Sintoniza primero el prisma central. Después alterna entre Brasas y Reverso según la inscripción de cada prisma.', targets:['Prisma de las mareas','Prisma del mediodía','Prisma de medianoche'], layers:[0,0,1], order:[1,0,2], map:`
#####################
#....T.........T....#
#.........J.........#
#...................#
##########G##########
#..3......K.......1.#
#.....T.......T.....#
#..E......2.......E.#
#....#.........#....#
#........U..........#
#...C.....S.........#
#.........P.........#
#####################` },
  { name:'Laberinto del Reino Invertido', subtitle:'De aquí saliste dos veces', hint:'Cruza los velos que cierran cada camino. Activa primero el del Reverso y después su reflejo en Brasas.', targets:['Velo de ceniza','Velo del doble'], layers:[0,1], order:[1,0], map:`
#####################
#....#.........#....#
#.........J.........#
#....T.........T....#
##########G##########
#...1.....K.....2...#
#..###..#...#..###..#
#.......#...#.......#
#..E......T......E..#
#......#.....#......#
#...U..#..S..#..C...#
#.........P.........#
#####################` },
  { name:'Corazón del Eclipse', subtitle:'A la espera de la mañana', hint:'Fija primero el recuerdo del exilio, después el de la promesa y finalmente el del nombre.', targets:['La promesa','El exilio','El nombre'], layers:[0,1,0], order:[1,0,2], map:`
#####################
#...T...........T...#
#.........J.........#
#......T.....T......#
##########G##########
#...3.....K.....2...#
#.....T.......T.....#
#.........1.........#
#...E...~~~~~...E...#
#.......~~=~~.......#
#...C...........U...#
#...................#
###===#########.#####
#...................#
#.....##.....##.....#
#..O...#.....#......#
#.........S.........#
#.........P.........#
#####################` }
] as const;

export interface Point { x:number; z:number }
export interface LevelObject extends Point { id:string; kind:string; marker:string }
export interface Level {
  id:string; name:string; subtitle:string; biome:Biome; index:number; dungeon:boolean;
  width:number; height:number; cells:string[]; objects:LevelObject[]; spawn:Point;
}
const objects: Record<string,string> = {
  E:'enemy', J:'boss', A:'entrance', X:'next', P:'back', H:'quest',
  B:'bell', O:'oath', I:'inscription', N:'npc', M:'merchant', V:'smith', C:'chest', F:'shrine', U:'tool', K:'key', G:'gate',
  '1':'target', '2':'target', '3':'target'
};
function load(index:number, dungeon:boolean): Level {
  const def = dungeon ? dungeons[index] : regions[index];
  const cells = def.map.trim().split('\n').map(row => row.trim());
  const id = (dungeon ? 'd' : 'r') + index;
  const level: Level = {
    id, name:def.name, subtitle:def.subtitle, biome:dungeon ? regions[dungeonRegions[index]].biome : regions[index].biome,
    index, dungeon, width:Math.max(...cells.map(row => row.length)), height:cells.length,
    cells, objects:[], spawn:{ x:0, z:0 }
  };
  for (const [z, row] of cells.entries()) {
    for (let x=0; x<row.length; x++) {
      const marker=row[x];
      if (marker==='S') level.spawn={ x:x+.5,z:z+.5 };
      if (objects[marker]) level.objects.push({ id:id+':'+x+':'+z, kind:objects[marker], marker, x:x+.5,z:z+.5 });
    }
  }
  return level;
}
export const levels = new Map<string, Level>([
  ...regions.map((_,index) => load(index,false)),
  ...dungeons.map((_,index) => load(index,true))
].map(level => [level.id, level]));

export function tile(level:Level,x:number,z:number,realm:number,gateOpen=false):string {
  const marker=level.cells[Math.floor(z)]?.[Math.floor(x)] ?? '#';
  if (marker==='L') return gateOpen ? '.' : '#';
  if (marker==='=') return realm ? '.' : '~';
  return marker;
}

export function targetPoint(level:Level,object:LevelObject,solved:boolean):Point {
  return solved && object.kind==='target' && level.index===4 ? {x:object.x,z:object.z-.68} : object;
}
