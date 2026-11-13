# Inicio rápido y diagnóstico

## Arrancar en Windows

Extrae el ZIP entero. Instala Node.js 22 o posterior si falta y ejecuta `launchers/windows/Iniciar-Eclipse.bat`. La consola indica la dirección local y abre el navegador. No hace falta `npm install` para jugar la compilación incluida.

Si Windows bloquea el ZIP descargado, abre sus propiedades, marca **Desbloquear**, acepta y vuelve a extraer. Ejecuta el BAT desde la carpeta extraída. No se necesita permiso de administrador.

## Arrancar en Linux Mint

Desde la carpeta del proyecto, ejecuta:

```bash
bash launchers/linux-mint/start.sh
```

Para crear un acceso con Terminal, usa `launchers/linux-mint/Eclipse-404.desktop`. Clic derecho y elige **Permitir lanzar**.

Si aparece un error sobre una versión de Node antigua, instala Node.js 22 LTS o posterior. Si aparece `dist/index.html`, vuelve a extraer el ZIP completo. Si sale `EADDRINUSE`, cierra la otra ventana del lanzador o libera el puerto 4040. El navegador asocia los guardados con la dirección y el puerto. Si jugaste con una dirección anterior, usa la pestaña antigua para exportar la partida si todavía puedes abrirla y luego impórtala en la dirección nueva. Copia el enlace que muestra la terminal. Comprueba en el navegador que WebGL 2 esté habilitado. Cierra la ventana del lanzador para parar el servidor.

## Si falla

Mantén abierta la consola y copia las primeras líneas del error. La compilación muestra un panel de diagnóstico si Three.js no logra crear el renderizador WebGL. En Windows, conserva abierta la ventana del BAT para leer los errores.
