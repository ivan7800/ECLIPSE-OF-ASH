import { spawn } from 'node:child_process';
import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const npm=process.platform==='win32'?'npm.cmd':'npm';
const lock=resolve(root,'package-lock.json');
try {await access(lock,constants.R_OK);}
catch {
  console.error('No se encuentra package-lock.json. Descomprime la carpeta completa del proyecto.');
  process.exitCode=1;
}
if(process.exitCode) process.exit();
const child=spawn(npm,['ci','--no-audit','--no-fund'],{cwd:root,stdio:'inherit',shell:process.platform==='win32'});
child.on('error',error=>{
  console.error('No se pudo iniciar npm:',error.message);
  process.exitCode=1;
});
child.on('exit',(code,signal)=>{
  if(signal) {console.error('npm terminó por la señal',signal);process.exitCode=1;}
  else if(code!==0) {console.error('npm no pudo instalar las dependencias (código',code+'). Comprueba tu conexión.');process.exitCode=code||1;}
  else console.log('Dependencias instaladas.');
});
