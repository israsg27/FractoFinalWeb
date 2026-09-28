import {useEffect,useRef} from 'react';

type AnimatedShinyTextProps={
 text:string;
 className?:string;
};

export default function AnimatedShinyText({text,className=''}:AnimatedShinyTextProps){
 const ref=useRef<HTMLSpanElement>(null);
 useEffect(()=>{
  let frame=0;
  const move=(event:PointerEvent)=>{
   cancelAnimationFrame(frame);
   frame=requestAnimationFrame(()=>{
    const node=ref.current;if(!node)return;
    const bounds=node.getBoundingClientRect();
    const position=Math.max(0,Math.min(100,(event.clientX-bounds.left)/bounds.width*100));
    node.style.setProperty('--shine-x',`${position}%`);
   });
  };
  window.addEventListener('pointermove',move,{passive:true});
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('pointermove',move)};
 },[]);
 return <span
  ref={ref}
  className={`animated-shiny-text ${className}`.trim()}
 >{text}</span>;
}
