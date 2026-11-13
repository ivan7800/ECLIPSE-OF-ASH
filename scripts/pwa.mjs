import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

async function list(dir,prefix=''){
  const result=[];
  for(const item of (await readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){
    const relative=prefix+item.name;
    if(item.isDirectory()) result.push(...await list(join(dir,item.name),relative+'/'));
    else if(item.name!=='sw.js') result.push(relative);
  }
  return result;
}
const files=await list('dist');
const hash=createHash('sha256');
for(const file of files) hash.update(file).update(await readFile(join('dist',file)));
const version=hash.digest('hex').slice(0,14);
await writeFile('dist/sw.js',`
const PREFIX='eclipse-404:'+self.registration.scope+':';
const CACHE=PREFIX+${JSON.stringify(version)};
const root=new URL(self.registration.scope);
const files=${JSON.stringify(files)}.map(path=>new URL(path,root).href);
self.addEventListener('install',event=>event.waitUntil(
  caches.open(CACHE).then(cache=>cache.addAll(files.map(url=>new Request(url,{cache:'reload'}))))
));
self.addEventListener('activate',event=>event.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key))))
    .then(()=>self.clients.claim())
));
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET'||!request.url.startsWith(root.href)) return;
  if(request.mode==='navigate'){
    event.respondWith(caches.open(CACHE).then(cache=>cache.match(new URL('index.html',root).href)).then(hit=>hit||fetch(request)));
  } else if(files.includes(request.url)){
    event.respondWith(caches.open(CACHE).then(cache=>cache.match(request)).then(hit=>hit||fetch(request)));
  }
});
`);
console.log('Offline cache: '+version+' ('+files.length+' files)');
