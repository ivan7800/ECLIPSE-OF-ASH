
const PREFIX='eclipse-404:'+self.registration.scope+':';
const CACHE=PREFIX+"653775e625c004";
const root=new URL(self.registration.scope);
const files=["assets/eclipse-192.png","assets/eclipse-512.png","assets/eclipse.svg","assets/index-CaVuDdOw.js","assets/index-CWyaomo2.css","assets/instrument-serif-latin-400-italic-DKMiL14s.woff2","assets/instrument-serif-latin-400-italic-u__WvvIK.woff","assets/instrument-serif-latin-400-normal-BVbkICAY.woff","assets/instrument-serif-latin-400-normal-DnYpCC2O.woff2","assets/instrument-serif-license.txt","assets/source-sans-3-latin-400-normal-DQi5PRDE.woff2","assets/source-sans-3-latin-400-normal-RR2C27NP.woff","assets/source-sans-3-latin-600-normal-Ck0n4g8U.woff","assets/source-sans-3-latin-600-normal-DeckBYAU.woff2","assets/source-sans-3-license.txt","assets/three-core-BT-ibd6O.js","assets/three-license.txt","assets/three-renderer-C9ZAJqwH.js","index.html","manifest.webmanifest"].map(path=>new URL(path,root).href);
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
