import 'fake-indexeddb/auto';
import { expect,test } from 'vitest';
import { Saves } from '../src/saves/store';
import { fresh, readSave } from '../src/core/state';

test('espacios independientes, exportación equivalente, persistencia tras reabrir y borrado',async()=>{
  const name='test-slot-isolation';
  const saves=new Saves(name);
  const state=fresh();
  state.gold=36;
  await saves.write(2,state);
  const reopen=new Saves(name);
  const entries=await reopen.list();
  expect(entries.map(slot=>slot.state?.gold??null)).toEqual([null,36,null]);
  expect(readSave(JSON.parse(JSON.stringify(entries[1].state)))).toEqual(entries[1].state);
  await reopen.remove(2);
  expect((await saves.list())[1].state).toBeNull();
});

test('migración v1 conserva inventario y descarta formatos incompatibles',()=>{
  const old={...fresh(),version:1,armor:undefined,quests:undefined,tool:0,tools:[0],gold:11};
  const upgraded=readSave(old);
  expect(upgraded).toMatchObject({version:2,armor:0,quests:{},tool:0,tools:[0],gold:11});
  expect(()=>readSave({...old,version:9})).toThrow();
  expect(()=>readSave({...old,tools:[0,0]})).toThrow();
  expect(()=>readSave({...fresh(),position:{x:Infinity,z:0}})).toThrow();
  expect(()=>readSave({...fresh(),flags:JSON.parse('{"__proto__":true}')})).toThrow();
});

test('restaura una copia anterior si el registro principal se corrompe',async()=>{
  const name='test-recovery';
  const saves=new Saves(name);
  await saves.write(1,{...fresh(),gold:10});
  await saves.write(1,{...fresh(),gold:25});
  const db=await new Promise<IDBDatabase>((resolve,reject)=>{
    const request=indexedDB.open(name,1);
    request.onsuccess=()=>resolve(request.result);
    request.onerror=()=>reject(request.error);
  });
  await new Promise<void>((resolve,reject)=>{
    const tx=db.transaction('slots','readwrite');
    const store=tx.objectStore('slots');
    const request=store.get(1);
    request.onsuccess=()=>store.put({...request.result,current:{version:2,level:'invalid'}});
    tx.oncomplete=()=>resolve();
    tx.onerror=()=>reject(tx.error);
  });
  const slot=(await saves.list())[0];
  expect(slot.recovered).toBe(true);
  expect(slot.state?.gold).toBe(10);
  db.close();
});
