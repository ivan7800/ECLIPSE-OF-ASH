# ECLIPSE OF ASH 404

Aventura HD-2D de acción y fantasía oscura. Bajo el eclipse de Vaeloria, una viajera despierta frente al arco de un santuario. La versión 0.3.0 añade cuatro armas de combate, arcos de transición automática y nuevas inscripciones. La versión 0.2.0 amplió la Catedral Sumergida y el Corazón del Eclipse. Los enemigos comunes avisan al detectar a Eira antes de atacar. El juego tiene luz local, pasos ligados al desplazamiento y audio original sintetizado.

## Windows

1. Extrae la carpeta completa del ZIP, por ejemplo en Descargas.
2. Instala Node.js 22 o posterior desde https://nodejs.org/ si no lo tienes.
3. Haz doble clic en INICIAR-WINDOWS.bat (también disponible en launchers/windows/Iniciar-Eclipse.bat).
4. El lanzador abre el juego en el navegador predeterminado. Mantén la ventana de terminal abierta mientras juegas.

Si Windows bloquea los archivos extraídos, clic derecho en el ZIP, Propiedades, marca Desbloquear y vuelve a extraer. El archivo BAT requiere la carpeta completa para encontrar dist/.

## Linux Mint

1. Extrae el ZIP desde el gestor de archivos.
2. Instala Node.js 22 LTS o posterior desde https://nodejs.org/ si no lo tienes.
3. Haz doble clic en INICIAR-LINUX.desktop y elige Permitir lanzar si Cinnamon lo solicita. También puedes abrir Terminal en la carpeta y ejecutar:

   ```bash
   bash INICIAR-LINUX.sh
   ```

4. Para las siguientes sesiones, vuelve a abrir el lanzador o usa launchers/linux-mint/start.sh.

Los ZIP incluyen la compilación `dist/`: para jugar no hace falta instalar paquetes ni conectarse a Internet. El lanzador inicia un servidor local, abre `http://127.0.0.1:4040/ECLIPSE-OF-ASH-404/` para conservar el acceso a los mismos guardados entre sesiones. `launchers/linux-mint/install.sh` e `Instalar-y-ejecutar.bat` son opciones para desarrolladores que quieran reinstalar dependencias y compilar.

## Requisitos

Node.js 22 o posterior y un navegador compatible con WebGL 2. El lanzador funciona aunque la carpeta se mueva o su ruta contenga espacios. Conserva juntos `dist/`, `scripts/` y `launchers/`.

Si no se abre la pestaña automáticamente, copia el enlace que muestra el terminal y ábrelo en Chrome, Edge, Firefox o Chromium. Cierra la terminal para apagar el servidor local.

## Desarrollo

```bash
npm ci
npm run dev
# En otra terminal, o después de cerrar Vite:
npm run build
npm test
npm run preview
```

La campaña de esta edición comprende diez regiones, ocho mazmorras, ocho jefes, dos realidades y tres finales. Las puertas de transición se cruzan caminando; E sirve para hablar, leer y abrir cofres. Las armas nuevas se equipan en Inventario. Cuatro horas es el objetivo de diseño. La duración de una primera partida todavía no se ha medido. Consulta docs/ para la arquitectura, la campaña, las pruebas y GitHub Pages. Las instrucciones ampliadas de arranque están en docs/INICIO-RAPIDO.md.
