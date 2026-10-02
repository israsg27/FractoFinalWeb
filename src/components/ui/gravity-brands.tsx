import {useEffect,useRef,useState} from 'react';
import type {CSSProperties} from 'react';
import Matter from 'matter-js';
import {useReducedMotion} from 'framer-motion';

type Brand={name:string;logo:string;colorLogo?:string;ink?:string};

const BRANDS:Brand[]=[
 {name:'Adara Salón',logo:'/assets/marcas/adara-salon.webp',colorLogo:'/assets/marcas/adara-salon-color.webp',ink:'#006d88'},
 {name:'AnaCris',logo:'/assets/marcas/anacris.webp',colorLogo:'/assets/marcas/anacris-color.webp',ink:'#ffb500'},
 {name:'Anestesia Avanzada',logo:'/assets/marcas/anestesia-avanzada.webp',colorLogo:'/assets/marcas/anestesia-avanzada-color.webp',ink:'#22929d'},
 {name:'Arkhe',logo:'/assets/marcas/arkhe.webp',colorLogo:'/assets/marcas/arkhe-color.webp',ink:'#4d6655'},
 {name:'Chal We',logo:'/assets/marcas/chal-we.webp',colorLogo:'/assets/marcas/chal-we-color.webp',ink:'#b141fd'},
 {name:'Dra. Violeta Rodríguez',logo:'/assets/marcas/dra-violeta-rodriguez.webp',colorLogo:'/assets/marcas/dra-violeta-rodriguez-color.webp',ink:'#6d4ecc'},
 {name:'Dulces Mi Tierra',logo:'/assets/marcas/dulces-mi-tierra.webp',colorLogo:'/assets/marcas/dulces-mi-tierra-color.webp',ink:'#f38113'},
 {name:'Gabo tu asesor',logo:'/assets/marcas/gabo-tu-asesor.webp',colorLogo:'/assets/marcas/gabo-tu-asesor-color.webp',ink:'#ffa9d4'},
 {name:'Hospital San José',logo:'/assets/marcas/hospital-san-jose.webp',colorLogo:'/assets/marcas/hospital-san-jose-color.webp',ink:'#5ca6e4'},
 {name:'Hotel Embrujo Boutique',logo:'/assets/marcas/hotel-embrujo-boutique.webp',colorLogo:'/assets/marcas/hotel-embrujo-boutique-color.webp',ink:'#596839'},
 {name:'Hurbe',logo:'/assets/marcas/hurbe.webp',colorLogo:'/assets/marcas/hurbe-color.webp',ink:'#218dd3'},
 {name:'Inglés Individual',logo:'/assets/marcas/ingles-individual.webp',ink:'#00b140'},
 {name:'IUNGO',logo:'/assets/marcas/iungo.webp',colorLogo:'/assets/marcas/iungo-color.webp',ink:'#7354fb'},
 {name:'Mariana',logo:'/assets/marcas/mariana.webp',colorLogo:'/assets/marcas/mariana-color.webp',ink:'#fd29db'},
 {name:'Menos Dolor',logo:'/assets/marcas/menos-dolor.webp',colorLogo:'/assets/marcas/menos-dolor-color.webp',ink:'#07ce92'},
 {name:'Norberto Torres',logo:'/assets/marcas/norberto-torres.webp',colorLogo:'/assets/marcas/norberto-torres-color.webp',ink:'#e63e52'},
 {name:'Posada Las Nubes',logo:'/assets/marcas/posada-las-nubes.webp'},
 {name:'Punto y Come',logo:'/assets/marcas/punto-y-come.webp',colorLogo:'/assets/marcas/punto-y-come-color.webp',ink:'#e26543'},
 {name:'StrongBerries',logo:'/assets/marcas/strongberries.webp',colorLogo:'/assets/marcas/strongberries-color.webp',ink:'#d3085b'},
 {name:'Tassei Trailers',logo:'/assets/marcas/tassei-trailers.webp',colorLogo:'/assets/marcas/tassei-trailers-color.webp',ink:'#fffb00'},
 {name:'VAHL',logo:'/assets/marcas/vahl.webp',colorLogo:'/assets/marcas/vahl-color.webp',ink:'#3561a4'},
];

const DISPLAY_BRANDS=[...BRANDS,...BRANDS.slice(0,7)];

const STEP=1000/60;

export default function GravityBrands(){
 const boxRef=useRef<HTMLDivElement>(null);
 const sectionRef=useRef<HTMLDivElement>(null);
 const reduced=useReducedMotion();
 const [staticMode,setStaticMode]=useState(()=>matchMedia('(max-width: 820px), (pointer: coarse)').matches);

 useEffect(()=>{const media=matchMedia('(max-width: 820px), (pointer: coarse)');const update=()=>setStaticMode(media.matches);media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[]);

 useEffect(()=>{
  const box=boxRef.current;
  if(!box||reduced||staticMode)return;

  const {Engine,Bodies,Body,Composite,Mouse,MouseConstraint}=Matter;
  const engine=Engine.create({gravity:{x:0,y:.92}});
  let size=parseFloat(getComputedStyle(box).getPropertyValue('--brand-size'))||112;
  let walls:Matter.Body[]=[];
  let ceilingLocked=false;
  let ceilingTimer=0;

  const measure=()=>{
   const width=box.getBoundingClientRect().width;
   const nextSize=parseFloat(getComputedStyle(box).getPropertyValue('--brand-size'))||112;
   const columns=Math.max(2,Math.floor(width/(nextSize*1.12)));
   const rows=Math.ceil(DISPLAY_BRANDS.length/columns);
   if(!box.closest('.manifesto-teaser'))box.style.setProperty('--brand-height',`${Math.max(430,(rows+.85)*nextSize*1.08)}px`);
   return {width,size:nextSize,columns};
  };

  const first=measure();
  size=first.size;
  const gap=size*1.12;
  const margin=(first.width-first.columns*gap)/2;
  const bodies=DISPLAY_BRANDS.map((_,index)=>{
   const column=index%first.columns,row=Math.floor(index/first.columns);
   const stagger=row%2?gap*.45:0;
   return Bodies.rectangle(
    margin+(column+.5)*gap+stagger+(Math.random()-.5)*8,
    -size*(.65+row*.72)-(index%first.columns)*5,
    size,size,
    {friction:.42,frictionAir:.018,restitution:.22,angle:(Math.random()-.5)*.48}
   );
  });
  Composite.add(engine.world,bodies);

  const rebuildWalls=()=>{
   const before=size,next=measure();
   if(Math.abs(next.size-before)>.5){
    const ratio=next.size/before;
    bodies.forEach(body=>Body.scale(body,ratio,ratio));
    size=next.size;
   }
   Composite.remove(engine.world,walls);
   const {width,height}=box.getBoundingClientRect(),guard=220;
   walls=[
    Bodies.rectangle(width/2,ceilingLocked?-guard/2:-920,width+guard*2,guard,{isStatic:true}),
    Bodies.rectangle(width/2,height+guard/2,width+guard*2,guard,{isStatic:true}),
    Bodies.rectangle(-guard/2,height/2,guard,height+guard*2,{isStatic:true}),
    Bodies.rectangle(width+guard/2,height/2,guard,height+guard*2,{isStatic:true}),
   ];
   Composite.add(engine.world,walls);
   bodies.forEach(body=>Body.setPosition(body,{x:Math.min(width-size/2,Math.max(size/2,body.position.x)),y:Math.min(height-size/2,body.position.y)}));
  };
  rebuildWalls();

  const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  let mouse:Matter.Mouse|undefined,drag:Matter.MouseConstraint|undefined;
  let teardownMouse=()=>{};
  if(fine){
   mouse=Mouse.create(box);
   drag=MouseConstraint.create(engine,{mouse,constraint:{stiffness:.18,damping:.12,render:{visible:false}}});
   Composite.add(engine.world,drag);
   const raw=mouse as unknown as {element:HTMLElement;mousewheel:EventListener;mousedown:EventListener;mousemove:EventListener;mouseup:EventListener};
   raw.element.removeEventListener('wheel',raw.mousewheel);
   raw.element.removeEventListener('touchstart',raw.mousedown);
   raw.element.removeEventListener('touchmove',raw.mousemove);
   raw.element.removeEventListener('touchend',raw.mouseup);
   const moveOutside=(event:MouseEvent)=>raw.mousemove(event);
   const stopGlobalDrag=()=>{
    window.removeEventListener('mousemove',moveOutside);
    window.removeEventListener('mouseup',finishOutside);
   };
   const finishOutside=(event:MouseEvent)=>{raw.mouseup(event);stopGlobalDrag()};
   const beginGlobalDrag=()=>{
    window.addEventListener('mousemove',moveOutside);
    window.addEventListener('mouseup',finishOutside,{once:true});
   };
   box.addEventListener('mousedown',beginGlobalDrag);
   teardownMouse=()=>{stopGlobalDrag();box.removeEventListener('mousedown',beginGlobalDrag)};
  }

  const nodes=Array.from(box.querySelectorAll<HTMLElement>('[data-brand-body]'));
  let raf=0,last=performance.now(),accumulator=0,visible=false,revealTimer=0;
  const frame=(now:number)=>{
   if(!visible)return;
   const elapsed=Math.min(50,now-last);last=now;accumulator+=elapsed;
   while(accumulator>=STEP){Engine.update(engine,STEP);accumulator-=STEP}
   bodies.forEach((body,index)=>{
    const node=nodes[index];
    if(!node)return;
    node.style.visibility='visible';
    node.style.transform=`translate3d(${body.position.x-size/2}px,${body.position.y-size/2}px,0) rotate(${body.angle}rad)`;
   });
   raf=requestAnimationFrame(frame);
  };
  const start=()=>{if(visible)return;visible=true;last=performance.now();raf=requestAnimationFrame(frame);if(!revealTimer)revealTimer=window.setTimeout(()=>{box.dataset.ready='true';revealTimer=0},2400);if(!ceilingLocked&&!ceilingTimer)ceilingTimer=window.setTimeout(()=>{ceilingLocked=true;ceilingTimer=0;rebuildWalls()},4200)};
  const stop=()=>{visible=false;cancelAnimationFrame(raf)};
  const observer=new IntersectionObserver(([entry])=>entry.isIntersecting&&document.visibilityState==='visible'?start():stop(),{rootMargin:'120px 0px 85% 0px'});
  const onVisibility=()=>document.visibilityState==='visible'&&box.getBoundingClientRect().bottom>-120&&box.getBoundingClientRect().top<innerHeight+120?start():stop();
  const resizeObserver=new ResizeObserver(rebuildWalls);
  observer.observe(box);resizeObserver.observe(box);document.addEventListener('visibilitychange',onVisibility);

  return()=>{
   stop();observer.disconnect();resizeObserver.disconnect();document.removeEventListener('visibilitychange',onVisibility);teardownMouse();window.clearTimeout(ceilingTimer);window.clearTimeout(revealTimer);
   if(mouse)Mouse.clearSourceEvents(mouse);
   Composite.clear(engine.world,false);Engine.clear(engine);
  };
 },[reduced,staticMode]);

 const activateGlow=(color?:string)=>sectionRef.current?.style.setProperty('--brand-glow',color||'#f4f3ee');

 return <div ref={sectionRef} className="brand-gravity" aria-label="Logotipos de marcas con las que hemos trabajado">
  <div ref={boxRef} className="brand-gravity-box" data-cursor={staticMode?undefined:'drag'} data-reduced={reduced||undefined} data-static={staticMode||undefined} onDragStart={event=>event.preventDefault()}>
   <div className="brand-gravity-light" aria-hidden="true"/>
   <div className="brand-gravity-rings" aria-hidden="true">
    <span/>
   </div>
   <div className="brand-gravity-particles" aria-hidden="true">
    {Array.from({length:24},(_,index)=><i key={index} style={{'--particle-x':`${4+(index*37)%93}%`,'--particle-y':`${18+(index*29)%68}%`,'--particle-size':`${index%5===0?2.4:index%3===0?1.7:1}px`,'--particle-delay':`${-(index%8)*.63}s`,'--particle-duration':`${5.8+(index%6)*.72}s`} as CSSProperties}/>) }
   </div>
   <ul>
    {(staticMode?BRANDS:DISPLAY_BRANDS).map((brand,index)=><li key={`${brand.name}-${index}`} data-brand-body onPointerEnter={()=>activateGlow(brand.ink)} onPointerLeave={()=>activateGlow()} style={{'--brand-ink':brand.ink||'#f4f3ee'} as CSSProperties}>
     {brand.colorLogo&&<span className="brand-gravity-color" style={{'--brand-src':`url(${brand.colorLogo})`} as CSSProperties}/>} 
     <span className="brand-gravity-logo" style={{'--brand-src':`url(${brand.logo})`} as CSSProperties}/>
     <span className="sr-only">{brand.name}</span>
    </li>)}
   </ul>
  </div>
 </div>;
}
