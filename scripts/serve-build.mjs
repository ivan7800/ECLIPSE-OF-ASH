import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';

const root=resolve(import.meta.dirname,'..','dist');
const port=Number(process.env.ECLIPSE_TEST_PORT??4173);
const prefix='/ECLIPSE-OF-ASH-404/';
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8',
  '.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml','.json':'application/json','.woff2':'font/woff2','.woff':'font/woff'};
const server=createServer(async(req,res)=>{
  const url=new URL(req.url??'/','http://127.0.0.1');
  if(!url.pathname.startsWith(prefix)){res.writeHead(404).end();return;}
  const path=resolve(root,decodeURIComponent(url.pathname.slice(prefix.length)||'index.html'));
  if(!path.startsWith(root+sep)){res.writeHead(404).end();return;}
  try{
    const buffer=await readFile(path);
    res.writeHead(200,{'Content-Type':types[extname(path)]??'application/octet-stream'});
    res.end(buffer);
  } catch {res.writeHead(404).end();}

});
server.listen(port,'0.0.0.0',()=>{
 console.log('Eclipse is ready at http://127.0.0.1:'+port+prefix);
});
