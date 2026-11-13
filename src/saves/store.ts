import { readSave, type SaveState } from '../core/state';

interface RecordValue { slot:number; current:unknown; backup?:unknown; updated:number }
export interface Slot { slot:number; state:SaveState|null; updated:number; recovered:boolean; corrupt:boolean }

export class Saves {
  private connection:Promise<IDBDatabase>|undefined;

  constructor(private name='eclipse-of-ash-404') {}

  private open() {
    this.connection??=new Promise((resolve,reject)=>{
      const request=indexedDB.open(this.name,1);
      request.onupgradeneeded=()=>request.result.createObjectStore('slots',{keyPath:'slot'});
      request.onsuccess=()=>{
        const db=request.result;
        db.onversionchange=()=>{db.close();this.connection=undefined;};
        resolve(db);
      };
      request.onerror=()=>{this.connection=undefined;reject(request.error);};
      request.onblocked=()=>{this.connection=undefined;reject(new Error('Cierra las otras pestañas del juego.'));};
    });
    return this.connection;
  }

  async list():Promise<Slot[]> {
    const db=await this.open();
    const all=await new Promise<RecordValue[]>((resolve,reject)=>{
      const tx=db.transaction('slots','readonly');
      const request=tx.objectStore('slots').getAll();
      request.onsuccess=()=>resolve(request.result as RecordValue[]);
      request.onerror=()=>reject(request.error);
    });
    return [1,2,3].map(slot=>{
      const record=all.find(item=>item.slot===slot);
      if(!record) return {slot,state:null,updated:0,recovered:false,corrupt:false};
      try{return {slot,state:readSave(record.current),updated:record.updated,recovered:false,corrupt:false};}
      catch {
        try{return {slot,state:readSave(record.backup),updated:record.updated,recovered:true,corrupt:false};}
        catch{return {slot,state:null,updated:record.updated,recovered:false,corrupt:true};}
      }
    });
  }

  async write(slot:number,source:SaveState,reset=false) {
    if(![1,2,3].includes(slot)) throw new Error('Espacio de guardado inválido.');
    const state=readSave(source);
    const db=await this.open();
    await new Promise<void>((resolve,reject)=>{
      const tx=db.transaction('slots','readwrite');
      const store=tx.objectStore('slots');
      const request=store.get(slot);
      request.onsuccess=()=>{
        const existing=request.result as RecordValue|undefined;
        let backup:SaveState|undefined;
        if(existing && !reset) {
          try{backup=readSave(existing.current);}
          catch {try{backup=readSave(existing.backup);}catch{/* There is no valid recovery copy. */}}
        }
        store.put({slot,current:state,backup,updated:Date.now()} satisfies RecordValue);
      };
      tx.oncomplete=()=>resolve();
      tx.onabort=()=>reject(tx.error??new Error('Guardado cancelado.'));
      tx.onerror=()=>reject(tx.error??new Error('No se pudo guardar.'));
    });
  }

  async remove(slot:number) {
    const db=await this.open();
    await new Promise<void>((resolve,reject)=>{
      const tx=db.transaction('slots','readwrite');
      tx.objectStore('slots').delete(slot);
      tx.oncomplete=()=>resolve();
      tx.onabort=()=>reject(tx.error);
      tx.onerror=()=>reject(tx.error);
    });
  }
}
