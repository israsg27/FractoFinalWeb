import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

export function Arrow({ diagonal = false }: { diagonal?: boolean }) { return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h16m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" /></svg>; }
export function Mark(){return <svg viewBox="0 0 80 40" fill="currentColor" aria-hidden="true"><path d="M2 20c0-5 5-7 9-6 3-9 7-7 10-3 3-15 8-10 11-3 3-13 7-7 10 0v24c-3 7-7 13-10 0-3 7-8 12-11-3-3 4-7 6-10-3-4 1-9-1-9-6ZM47 3c13 5 13 29 0 34V3Zm17 5c9 4 9 20 0 24V8Zm12 7c5 2 5 8 0 10V15Z"/></svg>}
export function SectionHead({ label, children }: { label: string; children: ReactNode }) {return <div className="section-head"><span className="meta">{label}</span><div>{children}</div></div>}
export function Mascot({ className='' }: {className?:string}) {return <img className={`mascot ${className}`} src="/assets/entity-small.webp" width="64" height="64" alt=""/>}
export function Grain(){
 const ref=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const canvas=ref.current;if(!canvas)return;
  const ctx=canvas.getContext('2d');if(!ctx)return;
  let frame=0;
  const tile=document.createElement('canvas');tile.width=256;tile.height=256;
  const tileContext=tile.getContext('2d');if(!tileContext)return;
  const data=tileContext.createImageData(256,256);
  for(let i=0;i<data.data.length;i+=4){const c=Math.random()*255;data.data[i]=c;data.data[i+1]=c;data.data[i+2]=c;data.data[i+3]=23;}
  tileContext.putImageData(data,0,0);
  const pattern=ctx.createPattern(tile,'repeat');if(!pattern)return;
  const draw=()=>{
   canvas.width=window.innerWidth;canvas.height=window.innerHeight;
   ctx.fillStyle=pattern;ctx.fillRect(0,0,canvas.width,canvas.height);
  };
  const resize=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(draw)};
  draw();window.addEventListener('resize',resize);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',resize)};
 },[]);
 return <canvas ref={ref} className="grain" aria-hidden="true"/>;
}
export function Dialog({ title, children, onClose }: {title:string;children:ReactNode;onClose:()=>void}){const ref=useRef<HTMLDialogElement>(null);useEffect(()=>{const d=ref.current;const before=document.activeElement as HTMLElement;d?.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=old;before?.focus()};},[]);return <dialog ref={ref} aria-label={title} onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose()}}><div className="dialog-inner"><div className="dialog-top"><span className="meta">{title}</span><button className="close" onClick={onClose} aria-label="Cerrar">×</button></div>{children}</div></dialog>}
export function Playground(){const [freq,setFreq]=useState(45);const [playing,setPlaying]=useState(true);return <section className="playground section" id="laboratorio"><SectionHead label="LABORATORIO / 001"><span className="meta">EXPERIMENTACIÓN EN TIEMPO REAL</span></SectionHead><div className="lab-layout"><div><h2>Encuentra<br/>tu frecuencia.</h2><p>Mueve la luz. Cambia el ritmo.<br/>Cada interacción abre una posibilidad.</p><label className="meta" htmlFor="frequency">FRECUENCIA <span>{freq.toString().padStart(3,'0')} HZ</span></label><input id="frequency" type="range" min="1" max="100" value={freq} onChange={e=>setFreq(Number(e.target.value))}/><button className="text-link" onClick={()=>setPlaying(!playing)}>{playing?'Pausar movimiento':'Activar movimiento'} <span aria-hidden="true">{playing?'Ⅱ':'▷'}</span></button></div><div className={`frequency ${playing?'':'paused'}`} style={{'--frequency':`${8-freq/15}s`,'--hue':`${freq*3}deg`} as React.CSSProperties} onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--x',`${(e.clientX-r.left)/r.width*100}%`);e.currentTarget.style.setProperty('--y',`${(e.clientY-r.top)/r.height*100}%`)}}><div className="frequency-core"/><span className="meta">FRACTO® / ESPECTRO EN MOVIMIENTO</span></div></div></section>}
