# Pruebas y continuidad

## Edición 0.2.0

| Comprobación | Resultado |
|---|---|
| `npm run build` | Correcto. TypeScript estricto, Vite y generación de la PWA de producción. |
| `npm test` | 26 pruebas aprobadas. Dos recorridos automatizados de las ocho mazmorras y los tres finales en Historia y Normal. Incluye regresiones del puente y el atajo de la Catedral, enemigos al cambiar de realidad, espada en las ocho direcciones, guardados, derrota y lanzadores. |
| `npm run test:e2e` | Cinco pruebas aprobadas en Chromium Headless. Arranque desde el prefijo de Pages, menús, guardado tras recarga, offline, móvil emulado, activación de audio, entrada al Santuario y diálogo de la Catedral en ambas realidades. |
| `bash INICIAR-LINUX.sh` | Dos arranques consecutivos dieron HTTP 200 en la misma dirección, con el puerto 4040. Los tres accesos gráficos pasan `desktop-file-validate`. |
| Windows | Lanzador incluido. Comprobación del código sin ejecución en Windows. |
| GitHub Pages | Compilación local verificada con la ruta de publicación. El repositorio de destino devolvió 404 al consultar GitHub. |

Chromium del sistema falló por permisos de sockets en el entorno. La ejecución con el navegador headless de Playwright terminó correctamente. La comprobación de audio confirma que se programa la síntesis después de un gesto. El balance sonoro requiere escucha humana. La duración de cuatro horas y el rendimiento en dispositivos físicos quedan pendientes de una partida cronometrada. No se añade una licencia del código original sin una elección del titular. El paquete incluye las licencias de terceros que ya acompañan a los recursos.

## Edición 0.1.4

La compilación se ejecutó con TypeScript estricto. Vitest simuló controles a 60 pasos por segundo. Playwright ejecutó Chromium Headless con renderizado WebGL de software y una sesión móvil emulada. La comprobación de los lanzadores inició el servidor de escritorio con un puerto libre desde el subdirectorio de Linux y solicitó recursos reales del juego.

| Comprobación | Resultado |
|---|---|
| `npm test` | 20 pruebas aprobadas en 4 archivos. Incluye campaña en dificultad Historia y Normal, movimiento y colisiones, orientación del arco de espada en cinco direcciones, recuperación de partidas, migración, integridad de mapas y prueba HTTP del lanzador. |
| `npm run build` | Correcto. Generó la compilación, las fuentes, el manifiesto y el service worker con caché versionada. |
| `npm run test:e2e` | 4 pruebas aprobadas. Comprueban arranque bajo la ruta de Pages, paneles y marcador del mapa, persistencia, descarga sin conexión, movimiento táctil emulado, importación/exportación JSON, ataque con audio activo y entrada al Santuario. |
| `bash launchers/linux-mint/start.sh` | Correcto en Linux Mint compatible con Node 22+. Abrió un servidor en loopback y mostró una URL accesible. La prueba final cerró el servidor con Ctrl+C. |
| Launcher Windows | Revisados el acceso directo de raíz, rutas, verificación de Node.js 22+, orden de arranque y manejo de errores. El BAT no se ejecutó en Windows físico. |
| Lanzadores `.desktop` | Los tres accesos de Linux pasan `desktop-file-validate`; el lanzador de raíz usa la ruta del propio archivo para localizar el juego. |
| GitHub Pages | Compilación con prefijo de Pages verificada en Chromium local. Aún no publicado. |

## Incidencias y arreglos

- El arco de espada se dibujaba inclinado fuera del suelo porque se combinaban rotaciones Euler en orden incorrecto. El golpe gira ahora alrededor de la normal del suelo. Cinco comprobaciones geométricas comprueban que el centro del arco apunta al frente en cuatro direcciones cardinales y una diagonal.

- El servidor inicial asumía que se ejecutaba desde la raíz. El lanzador ahora resuelve la ruta desde su propio script y no depende del directorio de trabajo.
- La ruta de acceso indicada en la versión inicial no correspondía al prefijo que esperaba el servidor. El juego imprime la URL que abre y sirve desde un puerto libre.
- La prueba final descubrió una comprobación de Node que pasaba un booleano a `process.exit`. Se cambió por el código de salida numérico y se inició el lanzador en Linux.
- Se añadieron versiones anteriores del estado de armadura para migrar partidas v2 que no tuvieran ese campo.

## Límites

Las pruebas de campaña son simulaciones automatizadas. No hay sesión de juego humana, ni comprobación del rendimiento en una GPU física o un iPhone/Steam Deck. Linux Mint se comprobó mediante el lanzador de raíz en el entorno Linux disponible. Windows se comprobó estáticamente desde el contenido BAT, sin máquina Windows. Los lanzadores de Linux necesitan Node.js 22 o superior. Instalar dependencias para compilar por primera vez requiere Internet. La iluminación del personaje usa una luz local sin sombras dinámicas para mantener el rendimiento; el audio sigue siendo síntesis Web Audio original, no grabaciones de instrumentos o Foley.

La campaña abarca diez regiones y ocho mazmorras compactas de una zona. El bestiario tiene doce enemigos comunes. Las mazmorras de varias salas, el elenco ampliado, los jefes opcionales, el clima avanzado y las sesiones humanas quedan para iteraciones posteriores.

## Edición 0.3.0

El recorrido automatizado de la campaña se adaptó a las transiciones por proximidad y sigue comprobando las ocho mazmorras y los finales. Se añadieron comprobaciones de equipamiento de armas, interrupción y migración de partidas antiguas. En total, 28 pruebas unitarias y de integración. La compilación usa TypeScript estricto. Seis pruebas de navegador comprueban el arranque, el guardado, el menú, la PWA, la interfaz móvil emulada y la entrada automática con un arma equipada y persistente.

El objetivo de cuatro horas sigue pendiente de una primera partida humana cronometrada. Varios mapas mantienen un área compacta y una secuencia semejante de llave y reja. Los efectos y las siluetas son arte procedimental original que necesita revisión artística en equipos físicos. Windows y Steam Deck no se han probado directamente.
