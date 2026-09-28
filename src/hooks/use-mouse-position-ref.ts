import {type RefObject,useEffect,useRef} from 'react';

export function useMousePositionRef(containerRef:RefObject<HTMLElement|null>){
 const position=useRef({x:0,y:0,active:false});
 useEffect(()=>{
  const update=(x:number,y:number)=>{
   const node=containerRef.current;if(!node)return;
   const rect=node.getBoundingClientRect();
   const inside=x>=rect.left&&x<=rect.right&&y>=rect.top&&y<=rect.bottom;
   position.current={x:x-(rect.left+rect.width/2),y:y-(rect.top+rect.height/2),active:inside};
  };
  const mouse=(event:PointerEvent)=>update(event.clientX,event.clientY);
  const leave=()=>{position.current={x:0,y:0,active:false}};
  window.addEventListener('pointermove',mouse,{passive:true});
  window.addEventListener('blur',leave);
  return()=>{window.removeEventListener('pointermove',mouse);window.removeEventListener('blur',leave)};
 },[containerRef]);
 return position;
}
