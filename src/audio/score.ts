import { biomes, type Biome } from '../data/catalog';
import type { FxKind } from '../core/game';

export interface Volumes { master:number; music:number; effects:number; ambience:number }
export const defaultVolumes:Volumes={master:.68,music:.52,effects:.70,ambience:.45};
type Mode='menu'|'calm'|'dungeon'|'battle'|'boss'|'story';
const note=(midi:number)=>440*2**((midi-69)/12);

export class Score {
  private ctx:AudioContext|undefined;
  private master!:GainNode;
  private music!:GainNode;
  private effects!:GainNode;
  private ambience!:GainNode;
  private air!:AudioBuffer;
  private beat=0;
  private next=0;
  private volumes=defaultVolumes;
  private key='';
  private ambienceSource:AudioBufferSourceNode|undefined;
  private ambienceEnvelope:GainNode|undefined;

  async unlock() {
    if(!this.ctx) {
      const ctx=new AudioContext();
      this.ctx=ctx;
      this.master=ctx.createGain();
      this.music=ctx.createGain();this.effects=ctx.createGain();this.ambience=ctx.createGain();
      this.music.connect(this.master);this.effects.connect(this.master);this.ambience.connect(this.master);
      const limiter=ctx.createDynamicsCompressor();
      this.master.connect(limiter);limiter.connect(ctx.destination);
      this.air=ctx.createBuffer(1,ctx.sampleRate*3,ctx.sampleRate);
      const samples=this.air.getChannelData(0);
      let previous=0,seed=1057;
      for(let i=0;i<samples.length;i++) {
        seed=(Math.imul(seed,1664525)+1013904223)>>>0;
        previous=previous*.87+(seed/2147483648-1)*.13;
        samples[i]=previous;
      }
      this.set(this.volumes);
    }
    if(this.ctx.state==='suspended') await this.ctx.resume();
  }

  set(volumes:Volumes) {
    this.volumes=volumes;
    const ctx=this.ctx;
    if(!ctx) return;
    for(const [node,value] of [[this.master,volumes.master],[this.music,volumes.music],[this.effects,volumes.effects],[this.ambience,volumes.ambience]] as const){
      node.gain.setTargetAtTime(value,ctx.currentTime,.05);
    }
  }

  private tone(hz:number,t:number,length:number,volume:number,dest:AudioNode,kind:OscillatorType,end=hz) {
    const ctx=this.ctx!;
    const osc=ctx.createOscillator(), envelope=ctx.createGain();
    osc.type=kind;
    osc.frequency.setValueAtTime(hz,t);
    osc.frequency.exponentialRampToValueAtTime(end,t+length);
    envelope.gain.setValueAtTime(.0001,t);
    envelope.gain.exponentialRampToValueAtTime(volume,t+Math.min(.09,length*.26));
    envelope.gain.exponentialRampToValueAtTime(.0001,t+length);
    osc.connect(envelope);envelope.connect(dest);
    osc.start(t);osc.stop(t+length+.02);
    osc.onended=()=>{osc.disconnect();envelope.disconnect();};
  }

  private noise(t:number,length:number,volume:number,frequency:number,endFrequency=frequency) {
    const ctx=this.ctx!;
    const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),env=ctx.createGain();
    source.buffer=this.air;
    filter.type='bandpass';filter.Q.value=.72;
    filter.frequency.setValueAtTime(frequency,t);
    filter.frequency.exponentialRampToValueAtTime(Math.max(30,endFrequency),t+length);
    env.gain.setValueAtTime(.0001,t);env.gain.linearRampToValueAtTime(volume,t+Math.min(.012,length*.18));
    env.gain.exponentialRampToValueAtTime(.0001,t+length);
    source.connect(filter);filter.connect(env);env.connect(this.effects);
    source.start(t,.35,length);source.onended=()=>{source.disconnect();filter.disconnect();env.disconnect();};
  }

  private bed(biome:Biome,shadow:boolean) {
    const ctx=this.ctx!;
    const now=ctx.currentTime;
    if(this.ambienceSource&&this.ambienceEnvelope){
      this.ambienceEnvelope.gain.cancelScheduledValues(now);
      this.ambienceEnvelope.gain.setTargetAtTime(.0001,now,.12);
      try{this.ambienceSource.stop(now+.55);}catch{/* already stopped */}
    }
    const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
    source.buffer=this.air;source.loop=true;
    filter.type='lowpass';
    filter.frequency.value=shadow?210:biome==='coast'?610:biome==='marsh'?440:350;
    const level=biome==='coast'?.22:biome==='marsh'?.17:.12;
    gain.gain.setValueAtTime(.0001,now);
    gain.gain.setTargetAtTime(level,now,.32);
    source.connect(filter);filter.connect(gain);gain.connect(this.ambience);
    source.start(now);source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};
    this.ambienceSource=source;this.ambienceEnvelope=gain;
  }

  update(biome:Biome,shadow:boolean,mode:Mode) {
    const ctx=this.ctx;
    if(!ctx||ctx.state!=='running') return;
    const key=biome+shadow+mode;
    if(key!==this.key){
      if(!this.key.startsWith(biome+shadow)) this.bed(biome,shadow);
      this.key=key;this.beat=0;this.next=ctx.currentTime+.045;
    }
    if(this.next<ctx.currentTime-.15) this.next=ctx.currentTime+.045;
    const motif=mode==='menu'?[45,52,57,60,62,57,53,52]:biomes[biome].music;
    const quick=mode==='boss'||mode==='battle';
    const duration=mode==='boss'?.31:mode==='battle'?.39:mode==='dungeon'?.66:.57;
    while(this.next<ctx.currentTime+.12){
      const i=this.beat++, t=this.next;
      const pitch=motif[i%motif.length]+(shadow?-2:0);
      const melodicBeat=mode==='menu' ? i%4!==3 : [0,2,5].includes(i%8);
      if(quick || melodicBeat) {
        this.tone(note(pitch+12),t,duration*1.6,quick?.09:.074,this.music,'sine');
        this.tone(note(pitch+24)*1.003,t+.012,duration*.75,.023,this.music,'sine');
      }
      if(i%(quick||mode==='menu'?4:8)===0){
        this.tone(note(pitch-12),t,duration*3.65,.17,this.music,'triangle');
        this.tone(note(pitch-5),t+.07,duration*2.9,.041,this.music,'sine');
      }
      if(quick&&i%2===0) this.tone(94,t,.26,.15,this.music,'sine',38);
      this.next+=duration;
    }
  }

  effect(kind:FxKind,biome:Biome='forest') {
    if(!this.ctx||this.ctx.state!=='running') return;
    const t=this.ctx.currentTime+.006;
    const tunes:Record<FxKind,[number,number,number,number]>={
      notice:[144,118,.23,.055],slash:[470,132,.16,.24],charge:[540,65,.3,.27],dodge:[330,130,.19,.12],
      hit:[190,56,.21,.24],shift:[210,680,.62,.22],heal:[380,660,.42,.18],
      chest:[430,870,.42,.22],gate:[150,60,.39,.24],tool:[570,292,.22,.14],
      warning:[235,270,.22,.13],boss:[105,314,.64,.24],step:[93,64,.08,.07],
      block:[470,280,.14,.21],bomb:[152,37,.49,.33]
    };
    const [start,end,length,volume]=tunes[kind];
    this.tone(start,t,length,volume,this.effects,kind==='step'?'sine':'triangle',end);
    if(kind==='step') {
      const ground:Record<Biome,number>={forest:225,village:390,plain:180,ash:140,marsh:95,coast:310,city:430,garden:210,reverse:120,heart:160};
      const base=ground[biome];
      this.noise(t,.09,.045,this.randomBetween(base*.8,base*1.25),base*.62);
      this.tone(base*1.12,t,.055,.024,this.effects,'sine',base*.72);
    } else if(kind==='slash') {
      this.noise(t,.22,.075,2600,520);
      this.tone(620,t,.19,.075,this.effects,'sine',145);
    } else if(kind==='charge') {
      this.noise(t,.31,.055,1400,260);
      this.tone(start,t,.30,volume*.55,this.effects,'triangle',end);
    } else if(kind==='hit'||kind==='bomb') {
      this.noise(t,kind==='bomb'?.44:.16,kind==='bomb'?.22:.085,kind==='bomb'?480:720,kind==='bomb'?55:120);
      if(kind==='hit') this.tone(150,t,.12,.045,this.effects,'sine',58);
    } else if(kind==='block') {
      this.noise(t,.12,.035,3300,900);
      this.tone(960,t,.14,.10,this.effects,'triangle',620);
      this.tone(1370,t+.018,.10,.045,this.effects,'sine',810);
    } else if(kind==='dodge') {
      this.noise(t,.17,.045,1600,340);
    } else if(kind==='gate') {
      this.noise(t,.35,.06,390,72);
    } else if(kind==='shift') {
      this.noise(t,.42,.055,880,240);
    } else if(kind==='chest'||kind==='boss'||kind==='heal') {
      this.noise(t,.19,.025,2100,1100);
      this.tone(start*1.5,t+.11,length*.9,volume*.43,this.effects,'sine',end*1.5);
    } else if(kind==='tool'||kind==='warning') {
      this.noise(t,.10,.018,1800,780);
    }
  }

  private randomBetween(min:number,max:number) {
    return min+Math.random()*(max-min);
  }
}
