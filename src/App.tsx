import {useEffect,useRef,useState} from 'react';
import {Arrow} from './components';
import {HomePage,ProjectsPage,ServicesPage,TeamPage} from './AgencyContent';
import FractoCursor from './components/ui/fracto-cursor';
import LoadingGate from './LoadingGate';
import MenuPage from './MenuPage';
import {openWhatsApp} from './whatsapp';

export type Navigate=(path:string)=>void;

function usePath(){
 const [path,setPath]=useState(window.location.pathname);
 useEffect(()=>{const update=()=>setPath(window.location.pathname);window.addEventListener('popstate',update);return()=>window.removeEventListener('popstate',update)},[]);
 const navigate=(next:string)=>{const target=new URL(next,window.location.origin),current=`${window.location.pathname}${window.location.search}${window.location.hash}`;if(`${target.pathname}${target.search}${target.hash}`===current){window.scrollTo({top:0,behavior:'smooth'});return}history.pushState({},'',target);setPath(target.pathname);window.scrollTo({top:0,behavior:'auto'})};
 return [path,navigate] as const;
}

function ScrollProgress(){
 const [progress,setProgress]=useState(0);
 useEffect(()=>{let frame=0;const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const range=document.documentElement.scrollHeight-window.innerHeight;setProgress(range>0?Math.min(1,window.scrollY/range):0)})};update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',update)}},[]);
 return <div className="scroll-progress" aria-hidden="true"><i style={{transform:`scaleX(${progress})`}}/></div>;
}

function SiteLink({to,navigate,children,className}:{to:string;navigate:Navigate;children:React.ReactNode;className?:string}){
 return <a href={to} className={className} onClick={e=>{if(!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey){e.preventDefault();navigate(to)}}}>{children}</a>;
}

function Header({path,navigate,onProject}:{path:string;navigate:Navigate;onProject:(message?:string)=>void}){
 const [menu,setMenu]=useState(false);const menuButton=useRef<HTMLButtonElement>(null);
 useEffect(()=>{setMenu(false)},[path]);
 useEffect(()=>{if(!menu)return;const close=(e:KeyboardEvent)=>{if(e.key==='Escape'){setMenu(false);menuButton.current?.focus()}};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close)},[menu]);
 const links=[['Proyectos','/proyectos'],['Servicios','/servicios'],['Carta','/menu'],['Equipo','/equipo']];
 return <header className="header"><SiteLink className="wordmark" to="/" navigate={navigate}><img src="/assets/symbol.svg" width="52" height="23" alt="FRACTO"/></SiteLink>
 <nav id="primary-navigation" aria-label="Navegación principal" className={menu?'open':''}>{links.map(([label,to])=><SiteLink key={to} to={to} navigate={navigate} className={path===to?'active':undefined}>{label}</SiteLink>)}</nav>
 <button className="header-contact" onClick={()=>onProject()}>WhatsApp</button><button ref={menuButton} className="menu-toggle" aria-controls="primary-navigation" aria-expanded={menu} onClick={()=>setMenu(!menu)} aria-label={menu?'Cerrar menú':'Abrir menú'}>{menu?'Cerrar':'Menú'}</button></header>;
}

export default function App(){
 const [path,navigate]=usePath();const start=(message?:string)=>openWhatsApp(message);
 useEffect(()=>{document.title=path==='/proyectos'?'Proyectos — FRACTO':path==='/servicios'?'Servicios — FRACTO':path==='/menu'?'Carta — FRACTO':path==='/equipo'||path==='/estudio'?'Equipo — FRACTO':'FRACTO — Consultora estratégica'},[path]);
 let page=<HomePage navigate={navigate} onProject={start}/>;
 if(path==='/proyectos')page=<ProjectsPage navigate={navigate} onProject={start}/>;
 if(path==='/servicios')page=<ServicesPage navigate={navigate} onProject={start}/>;
 if(path==='/menu')page=<MenuPage onProject={start}/>;
 if(path==='/equipo'||path==='/estudio')page=<TeamPage navigate={navigate} onProject={start}/>;
 return <><LoadingGate/><FractoCursor/><a className="skip" href="#main">Ir al contenido</a><ScrollProgress/><Header path={path} navigate={navigate} onProject={start}/><main id="main" tabIndex={-1} className="page-enter" key={path}>{page}</main><aside className="route-mark" aria-hidden="true"><span>{path==='/'?'00':path==='/proyectos'?'01':path==='/servicios'?'02':path==='/menu'?'03':'04'}</span><i/></aside></>;
}
