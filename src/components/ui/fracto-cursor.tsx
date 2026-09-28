import {useEffect,useRef} from 'react';

const INTERACTIVE='a,button,summary,[role="button"],[data-cursor="interactive"]';
const EDITABLE='input,textarea,select,[contenteditable="true"]';
const DRAGGABLE='[data-cursor="drag"]';

export default function FractoCursor(){
 const cursor=useRef<HTMLDivElement>(null);

 useEffect(()=>{
  const finePointer=window.matchMedia('(hover:hover) and (pointer:fine)');
  if(!finePointer.matches)return;

  const root=document.documentElement;
  let frame=0;
  root.classList.add('fracto-cursor-enabled');

  const move=(event:PointerEvent)=>{
   cancelAnimationFrame(frame);
   frame=requestAnimationFrame(()=>{
    const node=cursor.current;
    if(!node)return;
    const target=event.target instanceof Element?event.target:null;
    node.style.transform=`translate3d(${event.clientX}px,${event.clientY}px,0)`;
    node.dataset.visible='true';
    node.dataset.hover=target?.closest(INTERACTIVE)?'true':'false';
    node.dataset.editing=target?.closest(EDITABLE)?'true':'false';
    node.dataset.drag=target?.closest(DRAGGABLE)?'true':'false';
   });
  };
  const leave=()=>{if(cursor.current)cursor.current.dataset.visible='false'};
  const down=()=>{if(cursor.current)cursor.current.dataset.pressed='true'};
  const up=()=>{if(cursor.current)cursor.current.dataset.pressed='false'};

  window.addEventListener('pointermove',move,{passive:true});
  window.addEventListener('pointerdown',down,{passive:true});
  window.addEventListener('pointerup',up,{passive:true});
  document.documentElement.addEventListener('pointerleave',leave);
  return()=>{
   cancelAnimationFrame(frame);
   root.classList.remove('fracto-cursor-enabled');
   window.removeEventListener('pointermove',move);
   window.removeEventListener('pointerdown',down);
   window.removeEventListener('pointerup',up);
   document.documentElement.removeEventListener('pointerleave',leave);
  };
 },[]);

 return <div ref={cursor} className="fracto-pointer" data-visible="false" data-hover="false" data-editing="false" data-drag="false" data-pressed="false" aria-hidden="true">
  <span className="fracto-pointer-echo fracto-pointer-echo-a"/>
  <span className="fracto-pointer-echo fracto-pointer-echo-b"/>
  <svg className="fracto-pointer-arrow" viewBox="0 0 32 36" focusable="false">
   <path className="fracto-pointer-glow" d="M4.2 3.8 27.4 14.2 17.2 17.2 13.2 29.1 4.2 3.8Z"/>
   <path className="fracto-pointer-core" d="M5.9 6.2 24.1 14.3 15.7 16.8 12.5 26.4 5.9 6.2Z"/>
  </svg>
  <svg className="fracto-pointer-hand" viewBox="0 0 40 44" focusable="false">
   <path className="fracto-pointer-glow" d="M12.2 19.2V9.6a3 3 0 0 1 6 0v7.1-9.3a3 3 0 0 1 6 0v9-7.1a3 3 0 0 1 6 0v9.2-5.4a3 3 0 0 1 6 0v13.6c0 8-5.1 13.1-13 13.1h-2.3c-5.3 0-8.7-2.3-11.6-6.5L4.8 27a3.4 3.4 0 0 1 5.5-4l1.9 2.1Z"/>
   <path className="fracto-pointer-core" d="M13.9 19.3V9.7c0-1.8 2.7-1.8 2.7 0v10.5h3.3V7.5c0-1.8 2.7-1.8 2.7 0v12.7h3.3V9.4c0-1.8 2.7-1.8 2.7 0v11.1h3.3v-7.3c0-1.8 2.7-1.8 2.7 0v13.4c0 6.9-4.2 11.4-11.4 11.4H21c-4.7 0-7.5-2-10.3-6l-4.5-6.3c-1.1-1.5 1.2-3.1 2.3-1.6l5.4 7.2Z"/>
  </svg>
 </div>;
}
