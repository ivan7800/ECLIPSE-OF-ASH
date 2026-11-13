import { spawn } from 'node:child_process';
import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const build=resolve(root,'dist');
const entry=resolve(build,'index.html');
try {await access(entry,constants.R_OK);}
catch {
  console.error('No se encuentra dist/index.html. Ejecuta primero npm run build.');
  process.exitCode=1;
}
if(process.exitCode) process.exit();

const port=Number(process.env.ECLIPSE_PORT??process.env.ECLIPSE_TEST_PORT??4040);
const prefix='/ECLIPSE-OF-ASH-404/';
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8',
'.css':'text/css; charset=utf-8','.webmanifest':'application/manifest+json',
'.png':'image/png','.svg':'image/svg+xml','.json':'application/json','.woff2':'font/woff2','.woff':'font/woff'};
const server=createServer(async(req,res)=>{
  let pathname;
  try {pathname=decodeURIComponent(new URL(req.url??'/', 'http://localhost').pathname);}
  catch {res.writeHead(400).end('Invalid URL');return;}
  if(!pathname.startsWith(prefix)){res.writeHead(404).end('Not found');return;}
  const relative=pathname.slice(prefix.length)||'index.html';
  const file=resolve(build,relative);
  if(!file.startsWith(build+sep)){res.writeHead(404).end('Not found');return;}
  try {
    const contents=await readFile(file);
    res.writeHead(200,{'Content-Type':types[extname(file)]??'application/octet-stream','Cache-Control':'no-cache'});
    res.end(contents);
  } catch {res.writeHead(404).end('Not found');}
});
server.on('error',error=>{
  console.error('No se pudo abrir un puerto local para el juego:',error.message);
  if(error.code==='EADDRINUSE') console.error('El puerto '+port+' está ocupado. Cierra la otra ventana del lanzador o libera ese puerto para acceder a tus partidas.');
  process.exitCode=1;
});
server.listen(port,'127.0.0.1',async()=>{
  const address=server.address();
  if(!address||typeof address==='string') {console.error('No se pudo obtener la dirección local.');server.close();process.exitCode=1;return;}
  const url='http://127.0.0.1:'+address.port+prefix;
  console.log('ECLIPSE OF ASH 404');
  console.log('El juego se está sirviendo desde esta carpeta, sin instalar dependencias.');
  console.log('Abre '+url);
  if(process.platform==='win32') {
    const opened=spawn('cmd.exe',['/d','/s','/c','start','',url],{stdio:'ignore',windowsVerbatimArguments:true});
    opened.on('error',()=>console.log('Copia el enlace y ábrelo en Chrome o Edge.'));
  } else if(process.platform==='linux') {
    const opened=spawn('xdg-open',[url],{stdio:'ignore'});
    opened.on('error',()=>console.log('Copia el enlace y ábrelo en Firefox o Chromium.'));
  }
  await delay(300);
});
function stop(){server.close(()=>process.exit());}
process.on('SIGINT',stop);process.on('SIGTERM',stop);
