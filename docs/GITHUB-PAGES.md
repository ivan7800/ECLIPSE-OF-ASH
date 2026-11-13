# GitHub Pages

Destino previsto: [ECLIPSE-OF-ASH-404](https://ivan7800.github.io/ECLIPSE-OF-ASH-404/).

1. Extrae el ZIP. La carpeta que contiene `package.json` debe ser la raíz del repositorio.
2. Si el repositorio existe, clónalo, examina su rama principal y copia el código sobre una rama de trabajo. Si es nuevo, inicializa el repositorio y añade un remoto autorizado.
3. Conserva `.github/workflows/pages.yml`, `package-lock.json`, `public/`, `src/`, `tests/` y los archivos de configuración. La carpeta `dist/` de la entrega es para jugar o comprobar. Los lanzadores de escritorio están en `launchers/` y no afectan a la publicación web. Actions la genera de nuevo.
4. En **Settings → Pages → Build and deployment**, configura **GitHub Actions** como origen.
5. Tras integrar la versión en `main`, espera al flujo **Build and deploy Pages**. Compila, ejecuta Vitest y Playwright, publica el artefacto web y muestra la URL resultante.
6. Abre la URL de Pages, empieza una partida y comprueba la descarga inicial. En el panel Application del navegador, confirma el ámbito del service worker. Cierra o recarga la aplicación tras desconectar la red para comprobar el arranque offline.

Vite compila con base relativa. Iconos, manifiesto y caché usan rutas relativas al ámbito. El proyecto funciona bajo el prefijo de la URL de Pages sin reescritura del servidor. IndexedDB vincula los guardados al origen. Para mover una partida de localhost a Pages, expórtala e impórtala desde el menú del juego.

La publicación y la ejecución de Actions quedan pendientes en el repositorio de destino.
