# Registro de cambios

## 0.1.0

- Primera edición jugable de ECLIPSE OF ASH 404, desde el despertar en el Bosque hasta el epílogo.
- Diez regiones, ocho mazmorras, dos realidades, doce enemigos comunes, ocho guardianes, ocho herramientas y tres desenlaces.
- Render HD-2D con recursos originales, iluminación dinámica, escena por bioma, atlas de sprites, sombras y agua animada.
- Teclado configurable, mando estándar, interfaz táctil, accesibilidad y tres perfiles gráficos.
- Equipo, economía, hogueras de viaje, diario, mapas, encargos, cofres y muro secreto.
- Tres guardados con respaldo, migración y transferencia JSON.
- Compilación estática, caché PWA y automatización GitHub Pages.
- Correcciones de integración para empuje de monolitos, aterrizaje del garfio, pulsaciones breves y cierre de paneles con Escape.

## 0.1.1

- Añadidos lanzadores sin dependencias para Windows y Linux Mint.
- Corregido el inicio portable con rutas relativas a desktop.mjs.
- El puerto libre se selecciona de forma automática.
- Actualizadas instrucciones de instalación, diagnóstico y pruebas en navegador.
- Migrados guardados v2 antiguos que no contenían armadura.
- Verificado el arranque real del lanzador de Linux y la ruta de artefactos HTTP.

## 0.1.2

- Corregida la orientación del arco visual de espada y ataque cargado: ahora gira sobre el plano del suelo y sigue correctamente la dirección del jugador.
- Añadida cobertura unitaria de movimiento y colisiones; corregida una aserción de navegador que asumía una dirección concreta del marcador del mapa.
- Añadidas pruebas para ataques cardinales y diagonales.

## 0.1.3

- Añadidos accesos directos de inicio rápido en la raíz del paquete para Windows y Linux Mint.
- Corregida la sintaxis de los lanzadores `.desktop` para que Cinnamon los acepte al hacer doble clic.
- El lanzador de Windows valida Node.js 22+ y explica el error antes de intentar iniciar el juego.
- Añadidas instrucciones de doble clic y aclarado que la compilación incluida arranca sin instalar dependencias.


## 0.1.4

- Añadida luz local ámbar/violeta que acompaña a la protagonista y revela el suelo y la geometría cercana, con potencia ajustada a la calidad gráfica.
- Mejoradas la cadencia de carrera, el balanceo de pasos, la respiración sutil en reposo y el pulso visual de ataque.
- Rehechos los efectos de pasos por terreno, espada, carga, impacto, bloqueo, esquiva y portales con capas de ruido filtrado y tono.
- Suavizadas las transiciones del ambiente entre regiones.
- La prueba de navegador activa también un ataque con audio para detectar errores de reproducción.

## 0.2.0

- Ampliadas la Catedral Sumergida y la antesala del Corazón del Eclipse, con historias ambientales que cambian entre realidades.
- La Catedral incorpora una travesía por el Reverso y un atajo persistente que abre la reja del coro.
- Los objetivos muestran la región siguiente. Maela comenta el desenlace alcanzado en el epílogo.
- Los enemigos comunes detectan por distancia y línea de visión. Anticipan el ataque y conservan su vida entre cambios de realidad dentro del mismo mapa.
- El arco de espada conserva la dirección del golpe. Los pasos se sincronizan con la distancia recorrida y la exploración deja más silencio entre notas.
- Los lanzadores usan el puerto fijo 4040 para mantener los guardados. GitHub Actions construye antes de ejecutar las pruebas que usan `dist/`.

## 0.3.0

- Los arcos de entrada, salida y conexión se cruzan andando. La llegada aleja a Eira del arco para evitar bucles.
- Cuatro armas con alcances, velocidades y efectos distintos. El mandoble interrumpe ataques, la lanza alcanza más lejos y el filo del Reverso consume resonancia. Tres se obtienen en cofres de mazmorra y se equipan en el inventario.
- Menú con piedra oscura, metal envejecido y un brillo discreto que respeta movimiento reducido.
- Inscripciones opcionales en Llanuras, Costa y Reino Invertido. Cada realidad cuenta una parte diferente y la primera lectura concede brasas.
- Los jefes anuncian la segunda fase. Las entradas de mazmorras derrotadas muestran un cambio visible.
- Eira tiene una capa y armadura revisadas, postura de ataque según el arma y arcos de golpe con distinto tamaño.
