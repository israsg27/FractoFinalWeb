"use client";

import {useEffect,useRef} from "react";
import {motion,useInView,useMotionValue,useReducedMotion,useScroll,useSpring,useTransform} from "framer-motion";

const EASE=[0.16,1,0.3,1] as const;
const DURATION=2;

export type GlowHorizonVariant="top"|"bottom"|"left"|"right";

const VARIANTS:Record<GlowHorizonVariant,{axis:"x"|"y";scaleAxis:"scaleX"|"scaleY";enterPct:string;restPct:string}>={
 top:{axis:"y",scaleAxis:"scaleY",enterPct:"-100%",restPct:"-50%"},
 bottom:{axis:"y",scaleAxis:"scaleY",enterPct:"100%",restPct:"50%"},
 left:{axis:"x",scaleAxis:"scaleX",enterPct:"100%",restPct:"50%"},
 right:{axis:"x",scaleAxis:"scaleX",enterPct:"-100%",restPct:"-50%"},
};

export interface GlowHorizonProps{className?:string;variant?:GlowHorizonVariant}

const PARTICLES=Array.from({length:44},(_,index)=>({
 left:`${2+(index*37)%96}%`,
 top:`${31+(index*19)%39}%`,
 size:index%9===0?2.6:index%4===0?1.8:1.1,
 drift:-14+(index*13)%29,
 rise:14+(index*7)%28,
 duration:4.2+(index%7)*.55,
 delay:(index%11)*.28,
}));

const RIPPLE_STEPS=[
 {spread:.04,opacity:.9},
 {spread:.105,opacity:.61},
 {spread:.17,opacity:.34},
 {spread:.235,opacity:.16},
] as const;

export default function GlowHorizonFM({className,variant="top"}:GlowHorizonProps){
 const {axis,scaleAxis,enterPct,restPct}=VARIANTS[variant];
 const root=useRef<HTMLDivElement>(null);
 const ripples=useRef<HTMLDivElement>(null);
 const reduced=useReducedMotion();
 const visible=useInView(root,{amount:.15});
 const pointerX=useMotionValue(0),pointerY=useMotionValue(0);
 const smoothX=useSpring(pointerX,{stiffness:70,damping:22,mass:.5});
 const smoothY=useSpring(pointerY,{stiffness:70,damping:22,mass:.5});
 const arcX=useTransform(smoothX,value=>value*.42),arcY=useTransform(smoothY,value=>value*.42);
 const textureX=useTransform(smoothX,value=>value*.95),textureY=useTransform(smoothY,value=>value*.95);
 const particleX=useTransform(smoothX,value=>value*1.55),particleY=useTransform(smoothY,value=>value*1.55);
 const {scrollY:pageScrollY,scrollYProgress}=useScroll({target:root,offset:["start start","end start"]});
 const scrollDepth=useTransform(scrollYProgress,[0,1],[0,reduced?0:48]);
 useEffect(()=>{const update=(value:number)=>{const range=Math.max(1,(root.current?.clientHeight??window.innerHeight)*.32);const linear=reduced?1:Math.min(1,Math.max(0,value/range));const progress=1-Math.pow(1-linear,4);Array.from(ripples.current?.children??[]).forEach((line,index)=>{const step=RIPPLE_STEPS[index];if(!step)return;const element=line as HTMLElement;element.style.transform=`translate(-50%,-50%) scale(${1+step.spread*progress})`;element.style.opacity=String(step.opacity*progress)})};update(pageScrollY.get());return pageScrollY.on("change",update)},[pageScrollY,reduced]);
 useEffect(()=>{
  const hero=root.current?.closest<HTMLElement>(".home-hero");
  const reset=()=>{pointerX.set(0);pointerY.set(0);hero?.style.setProperty("--hero-title-x","0px");hero?.style.setProperty("--hero-title-y","0px");hero?.style.setProperty("--hero-copy-x","0px");hero?.style.setProperty("--hero-copy-y","0px");hero?.style.setProperty("--hero-meta-x","0px");hero?.style.setProperty("--hero-meta-y","0px")};
  const inside=(event:MouseEvent|PointerEvent)=>{const bounds=root.current?.getBoundingClientRect();return !!bounds&&event.clientX>=bounds.left&&event.clientX<=bounds.right&&event.clientY>=bounds.top&&event.clientY<=bounds.bottom};
  const move=(event:PointerEvent)=>{if(reduced)return;if(!inside(event)){reset();return}const bounds=root.current!.getBoundingClientRect();const nx=(event.clientX-bounds.left)/bounds.width-.5,ny=(event.clientY-bounds.top)/bounds.height-.5;pointerX.set(nx*72);pointerY.set(ny*44);hero?.style.setProperty("--hero-title-x",`${nx*-44}px`);hero?.style.setProperty("--hero-title-y",`${ny*-32}px`);hero?.style.setProperty("--hero-copy-x",`${nx*-24}px`);hero?.style.setProperty("--hero-copy-y",`${ny*-16}px`);hero?.style.setProperty("--hero-meta-x",`${nx*-12}px`);hero?.style.setProperty("--hero-meta-y",`${ny*-8}px`)};
  const pulse=(event:MouseEvent)=>{if(!inside(event))return;Array.from(ripples.current?.children??[]).forEach((line,index)=>{line.getAnimations().forEach(animation=>animation.cancel());line.animate([{filter:"brightness(1) blur(.15px)"},{filter:`brightness(${reduced?1.5:1.8}) blur(.15px)`,offset:.34},{filter:"brightness(1) blur(.15px)"}],{duration:reduced?220:570+index*60,delay:reduced?0:index*55,easing:"cubic-bezier(.16,1,.3,1)"})})};
  window.addEventListener("pointermove",move,{passive:true});
  window.addEventListener("click",pulse,{passive:true});
  return()=>{window.removeEventListener("pointermove",move);window.removeEventListener("click",pulse);reset()};
 },[pointerX,pointerY,reduced]);
 return <div ref={root} className={`glow-horizon-shell ${className??""}`} aria-hidden="true">
  <motion.div className="glow-horizon-scroll" style={{y:scrollDepth}}>
   <motion.div className="glow-horizon-parallax" style={{x:arcX,y:arcY}}>
    <motion.div className="glow-horizon" style={{isolation:"isolate"}} initial={{[axis]:enterPct,[scaleAxis]:1.5,opacity:0,filter:"blur(15px)"}} animate={{[axis]:restPct,[scaleAxis]:1,opacity:1,filter:"blur(0px)"}} transition={{duration:DURATION,ease:EASE}}>
     <Arc variant={variant} color="#f8f8f3" size="132%" boxShadow="0 -5px 34px rgba(255,255,249,.86), 0 -18px 70px rgba(255,255,249,.28)" delay={1.2}/>
     <Arc variant={variant} color="#c4c4bd" size="120%" initialOffset="10%" blur={38} delay={.6}/>
     <Arc variant={variant} color="#5a5a55" size="124%" initialOffset="10%" blur={25} delay={0}/>
     <Arc variant={variant} color="#050605" size="120%" initialOffset="10%" blur={52} delay={0}/>
    </motion.div>
   </motion.div>
   <motion.div ref={ripples} className="glow-horizon-ripples" style={{x:arcX,y:arcY}}>{RIPPLE_STEPS.map((_,index)=><span key={index}/>)}</motion.div>
   <motion.span className="glow-horizon-halftone" style={{x:textureX,y:textureY}}/>
   <motion.div className="glow-horizon-particles" style={{x:particleX,y:particleY}}>{PARTICLES.map((particle,index)=><motion.span key={index} style={{left:particle.left,top:particle.top,width:particle.size,height:particle.size}} initial={false} animate={!reduced&&visible?{x:[0,particle.drift,0],y:[0,-particle.rise,-particle.rise-5],opacity:[0,.94,.5,0],scale:[.5,1.35,1,.65]}:{opacity:.2}} transition={!reduced&&visible?{duration:particle.duration,delay:particle.delay,repeat:Infinity,ease:"easeInOut"}:{duration:.2}}/>)}</motion.div>
  </motion.div>
  <span className="glow-parallax-hint">Mover para desplazar</span>
  <span className="glow-horizon-grain"/>
 </div>
}

function Arc({variant,color,size,initialOffset,blur,boxShadow,delay}:{variant:GlowHorizonVariant;color:string;size:string;initialOffset?:string;blur?:number;boxShadow?:string;delay:number}){
 const scale=parseFloat(size)/100;
 const {axis,enterPct}=VARIANTS[variant];
 const sign=enterPct.startsWith("-")?-1:1;
 const startPct=initialOffset?`${sign*Math.abs(parseFloat(initialOffset)-50)}%`:undefined;
 return <motion.div className="glow-horizon-arc" style={{scale,background:color,...(blur!==undefined&&{filter:`blur(${blur}px)`}),...(boxShadow&&{boxShadow})}} initial={startPct?{[axis]:startPct}:false} animate={startPct?{[axis]:0}:undefined} transition={{duration:DURATION,ease:EASE,delay}}/>;
}
