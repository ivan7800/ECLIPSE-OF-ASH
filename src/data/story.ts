export const memories = [
  'El ciervo recuerda tus manos. Tú ataste el primer nudo y le pediste que custodiara tu regreso.',
  'La abadesa hundió la catedral para salvar a los niños. En los registros del reino aún figura como una traidora.',
  'El capataz grabó ocho nombres en su herramienta. El último es el tuyo. Antes del eclipse te llamaban Eira.',
  'Bajo cada máscara hay un rostro que el reino decidió olvidar. La reina los guardó por si alguien venía a reclamarlos.',
  'El gigante cedió su sombra a la aldea. Desde entonces sueña con la única mañana que todavía existe.',
  'Los ocho fragmentos no eran pedazos del sol. Eran ocho recuerdos de la misma mañana, repartidos entre sus testigos.',
  'Tu doble recuerda haber abierto la grieta. Tú recuerdas haberla cerrado. La historia de Vaeloria necesita las dos versiones.',
  'Eira fue guardiana del alba. La noche empezó cuando encerró el recuerdo de su hermano en el sol para impedir que se perdiera.'
];
export const endings = {
  dawn: {
    title: 'El alba imperfecta',
    text: 'La primera luz en siglos sorprende a Maela mientras remienda un abrigo. El nombre de tu hermano desaparece del cielo. Antes de que el último cristal se enfríe, lo tallas en el alféizar de su casa. Nadie más lo recuerda. Maela deja allí un plato de sopa.'
  },
  keep: {
    title: 'La noche que aprendió a arder',
    text: 'Entregas tu nombre al eclipse para que las dos Vaelorias sigan existiendo. La gente enciende faroles y abre las puertas que dan al Reverso. Cada noche, un hombre se sienta junto al santuario. Nunca sabe tu nombre, pero siempre te guarda sitio.'
  },
  weave: {
    title: 'La hora de los dos cielos',
    text: 'Maela lee los nombres recuperados mientras enhebras el último recuerdo. Las dos ciudades se ven al otro lado de los charcos. Tu hermano cruza uno para traerte pan. En la plaza empieza a amanecer. Del otro lado, alguien le devuelve al cielo la primera estrella.'
  }
} as const;
export type Ending = keyof typeof endings;

export const villageEpilogue: Record<Ending, readonly [string,string]> = {
  dawn:['Maela','Hoy hice dos tazas. Dejé la segunda en el alféizar, al sol. El nombre grabado en la madera no me suena. ¿A ti sí?'],
  keep:['Maela','Alguien abrió una puerta junto a la fragua. Da a la misma calle, pero siempre hay alguien esperando al otro lado.'],
  weave:['Maela','Los niños cruzan el charco de la plaza para ver las primeras estrellas. Les digo que vuelvan antes de que salga el sol y se ríen de mí.']
};
export const questDefs = [
  { id:'letter', title:'La carta de Maela', detail:'Busca en un cofre del Bosque de los Susurros la carta del hijo de Maela y devuélvesela en la aldea.', reward: 12 },
  { id:'names', title:'Nombres bajo la sal', detail:'Encuentra el nombre perdido en los Pantanos y llévalo a Teren, en el Reverso de la aldea.', reward: 14 },
  { id:'seed', title:'Semillas para el alba', detail:'Busca una semilla en los Jardines y entrégasela a Ivara, en el Reino de las Brasas.', reward: 16 }
] as const;
export type QuestId = typeof questDefs[number]['id'];
