import {useState} from 'react';
import {Arrow,Dialog,Mascot} from './components';

const options=['Identidad de marca','Campaña','Sitio web','Contenido social','3D / Motion','Aún no lo sé'];
const answers:Record<string,string>={
 'Identidad de marca':'Empecemos por la esencia. ¿Qué hace diferente a tu organización y qué quieres que las personas sientan al conocerla?',
 'Campaña':'Una buena campaña parte de una intención clara. ¿Qué quieres comunicar, a quién y en qué momento?',
 'Sitio web':'Tu sitio puede ser la primera experiencia con tu marca. ¿Qué debería poder hacer una persona al visitarlo?',
 'Contenido social':'Busquemos una voz propia. ¿En qué canales está tu marca y qué te gustaría cambiar de su comunicación?',
 '3D / Motion':'Demos movimiento a la idea. ¿Imaginas una pieza de producto, una identidad en movimiento o una experiencia experimental?',
 'Aún no lo sé':'Está bien empezar con una pregunta. ¿Qué está pasando en tu organización y qué te gustaría que fuera distinto?'
};

export default function Chat({onProject}:{onProject:(message?:string)=>void}){
 const [open,setOpen]=useState(false),[messages,setMessages]=useState<{text:string;user:boolean}[]>([]),[input,setInput]=useState('');
 function send(text:string){if(!text.trim())return;setMessages(items=>[...items,{text,user:true},{text:answers[text]??'Lo guardo como punto de partida. Si quieres, podemos continuar la conversación directamente por WhatsApp.',user:false}]);setInput('')}
 const summary=messages.filter(message=>message.user).map(message=>message.text).join(' · ');
 return <><button className="chat-launcher" onClick={()=>setOpen(true)} aria-label="Abrir asistente FRACTO"><span>¿TIENES UNA IDEA?</span><Mascot/></button>{open&&<Dialog title="FRACTO / CONVERSACIONES" onClose={()=>setOpen(false)}><div className="chat-intro"><Mascot/><h2>¿Qué quieres<br/>hacer posible?</h2></div><p className="chat-note">Asistente guiado · respuestas automáticas</p><div className="messages" role="log" aria-live="polite">{messages.map((message,index)=><p key={index} className={message.user?'user-message':'bot-message'}><span className="meta">{message.user?'TÚ':'FRACTO'}</span>{message.text}</p>)}</div>{messages.length===0&&<div className="quick-options">{options.map(option=><button key={option} onClick={()=>send(option)}>{option}<Arrow/></button>)}</div>}<form className="chat-form" onSubmit={event=>{event.preventDefault();send(input)}}><label className="sr-only" htmlFor="chat-input">Escribe tu idea</label><input id="chat-input" value={input} onChange={event=>setInput(event.target.value)} placeholder="Cuéntame tu idea…" maxLength={1500}/><button aria-label="Añadir idea a la conversación" disabled={!input.trim()}><Arrow/></button></form><button className="text-link" onClick={()=>{setOpen(false);onProject(`Hola, usé el asistente de FRACTO y quiero continuar la conversación.${summary?` Mi punto de partida: ${summary}`:''}`)}}>Continuar por WhatsApp <Arrow/></button></Dialog>}</>;
}
