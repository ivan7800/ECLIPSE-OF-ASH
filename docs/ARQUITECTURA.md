# Arquitectura

## Ejecución

`src/main.ts` adapta el tiempo de `requestAnimationFrame` a pasos fijos de 1/60 s. Acota el tiempo de un fotograma para evitar una cola sin límite tras pausas del navegador. `Game` recibe entradas normalizadas y emite eventos. Renderizado, audio, paneles y guardados consumen esos eventos. El movimiento visual interpola la posición previa y la actual con el residuo del acumulador.

| Directorio | Responsabilidad |
|---|---|
| `src/core/` | Estado persistente y su validación, movimiento, combate, interacciones, herramientas, navegación y reglas |
| `src/data/` | Regiones y mazmorras en cuadrículas escritas a mano, catálogo de enemigos, objetos, relatos y finales |
| `src/rendering/` | Three.js, cámara ortográfica elevada, atlas Canvas, geometría, sombras, transiciones y efectos |
| `src/input/` | Conversión de teclado, ratón, mando y gestos táctiles a acciones de juego |
| `src/ui/` | HTML de menús y HUD, accesibilidad, mapa, ajustes, mando en menús y joystick |
| `src/audio/` | Composición generativa controlada por el bioma, programación Web Audio, ambiente y efectos |
| `src/saves/` | Tres espacios IndexedDB, escritura transaccional, copia previa, validación y migración |
| `scripts/` | Generación del service worker y servidor HTTP de prueba con el prefijo de Pages |
| `tests/` | Escenarios de simulación y pruebas Playwright sobre la compilación |

## Mapas y realidades

Un mapa especifica terreno, entradas, salidas, NPC, tesoros, enemigos y objetos de puzle mediante marcadores. Se carga una zona a la vez. Las variantes por realidad cambian pasarelas, materiales, población de enemigos, diálogos, cofres y mecanismos disponibles. Inventario, llaves, puertas, objetos resueltos y guardianes derrotados se conservan al cambiar de realidad. Los enemigos comunes se reinician al cambiar de mapa o recargar la partida. Mientras Eira permanece en el mapa, cada realidad conserva la posición y la vida de sus enemigos. Al cruzar se limpian proyectiles y ataques de enemigos comunes en preparación. Un guardián vivo conserva su estado al cambiar de realidad durante el duelo.

## Presentación y audio

Los sprites y texturas se dibujan a partir de arte original en `art.ts` y se suben como atlas de píxeles con filtrado de vecino más cercano en ampliación. El suelo se dibuja por instancias. Rocas y muros que comparten material se agrupan en lotes. Cada cambio de escena libera geometría, materiales y texturas exclusivos. Los atlas compartidos se reutilizan. Los perfiles Bajo, Medio y Alto controlan escalado, sombras y efectos. La reducción de movimiento acorta las transiciones, elimina parte de las partículas y desactiva el parpadeo del personaje.

El audio tiene cuatro ganancias y un compresor de salida. El secuenciador usa motivos de altura y duración en función de bioma, realidad y situación. Síntesis y ruido filtrado proporcionan pasos, armas, braseros, impactos y ambiente. La reproducción comienza tras una interacción.

## Persistencia

El esquema actual es v2. `readSave` valida el esquema, límites, identificadores y continuidad de guardianes. La migración v1 agrega armadura y registro de encargos. También acepta guardados v2 que carecían del campo de armadura. IndexedDB escribe de forma transaccional el estado actual y la copia anterior validada. La aplicación serializa las escrituras automáticas y manuales en una pestaña. La caché PWA se versiona con el hash de la compilación y queda separada por ámbito de instalación.
