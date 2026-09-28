import {createContext,type ReactNode,useCallback,useContext,useEffect,useRef} from 'react';
import {useAnimationFrame,useReducedMotion} from 'framer-motion';
import {useMousePositionRef} from '../../hooks/use-mouse-position-ref';

type FloatingContextType={registerElement:(id:string,element:HTMLDivElement,depth:number)=>void;unregisterElement:(id:string)=>void};
const FloatingContext=createContext<FloatingContextType|null>(null);

export default function Floating({children,className='',sensitivity=1,easingFactor=.055}:{children:ReactNode;className?:string;sensitivity?:number;easingFactor?:number}){
 const containerRef=useRef<HTMLDivElement>(null);
 const reduced=useReducedMotion();
 const active=useRef(false);
 const elements=useRef(new Map<string,{element:HTMLDivElement;depth:number;current:{x:number;y:number}}>()).current;
 const pointer=useMousePositionRef(containerRef);
 const registerElement=useCallback((id:string,element:HTMLDivElement,depth:number)=>elements.set(id,{element,depth,current:{x:0,y:0}}),[elements]);
 const unregisterElement=useCallback((id:string)=>elements.delete(id),[elements]);
 useEffect(()=>{
  const node=containerRef.current;
  if(!node)return;
  const observer=new IntersectionObserver(([entry])=>{active.current=entry.isIntersecting&&document.visibilityState==='visible'},{rootMargin:'18% 0px'});
  const handleVisibility=()=>{active.current=document.visibilityState==='visible'&&node.getBoundingClientRect().bottom>-innerHeight*.18&&node.getBoundingClientRect().top<innerHeight*1.18};
  observer.observe(node);
  document.addEventListener('visibilitychange',handleVisibility);
  return()=>{observer.disconnect();document.removeEventListener('visibilitychange',handleVisibility)};
 },[]);
 useAnimationFrame(()=>{
  if(reduced||!active.current)return;
  elements.forEach(data=>{
   const strength=(data.depth*sensitivity)/20;
   const targetX=(pointer.current.active?pointer.current.x:0)*strength;
   const targetY=(pointer.current.active?pointer.current.y:0)*strength;
   data.current.x+=(targetX-data.current.x)*easingFactor;
   data.current.y+=(targetY-data.current.y)*easingFactor;
   data.element.style.transform=`translate3d(${data.current.x}px,${data.current.y}px,0)`;
  });
 });
 return <FloatingContext.Provider value={{registerElement,unregisterElement}}><div ref={containerRef} className={`parallax-floating ${className}`}>{children}</div></FloatingContext.Provider>;
}

export function FloatingElement({children,className='',depth=1}:{children:ReactNode;className?:string;depth?:number}){
 const ref=useRef<HTMLDivElement>(null),id=useRef(`floating-${Math.random().toString(36).slice(2)}`),context=useContext(FloatingContext);
 useEffect(()=>{const node=ref.current;if(!node||!context)return;context.registerElement(id.current,node,depth);return()=>context.unregisterElement(id.current)},[context,depth]);
 return <div ref={ref} className={`floating-element ${className}`}>{children}</div>;
}
