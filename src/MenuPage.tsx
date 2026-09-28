import {Arrow} from './components';

type Dish={name:string;price:string;cell:string;note:string;items:string[]};
type Course={roman:string;title:string;lead:string;dishes:Dish[]};

const courses:Course[]=[
 {roman:'I',title:'Platos fuertes',lead:'Gestión completa. Se elige uno y se sostiene en el tiempo.',dishes:[
  {name:'Para existir',price:'$5,800',cell:'Comunicación',note:'El mínimo para dejar de ser invisible.',items:['Junta mensual de planeación de contenidos','Entrega de informes y estadísticas','12 artes, uno con edición especial de campaña','Sesión de foto y video de 2 horas al mes','Publicación y administración de 2 redes']},
  {name:'Para que me vean',price:'$8,900',cell:'Comunicación',note:'Presencia sostenida y campañas empujando detrás.',items:['Junta mensual de planeación','Informes y estadísticas','20 artes y 8 historias','Sesión de foto y video o asesoría de grabación','Administración de 3 redes y campañas']},
  {name:'Para ser el líder',price:'$13,600',cell:'Comunicación',note:'Ritmo quincenal y conversación con quien responde.',items:['Planeación quincenal','30 artes y 5 historias semanales','4 horas mensuales de foto y video','Administración de 3 redes','Interacción en comentarios e impulso de contenido']},
 ]},
 {roman:'II',title:'De la casa',lead:'El plato que no se encuentra en otro sitio.',dishes:[
  {name:'Plan Emprende',price:'desde $9,000',cell:'Rumbo',note:'Seis sesiones para llegar al núcleo de intención y traducirlo en estrategia.',items:['6 entrevistas en profundidad','Métodos científicos, mentales y emocionales','Planeación de posibilidades de crecimiento','Traducción a estrategia y lenguaje de diseño']},
 ]},
 {roman:'III',title:'Fondo',lead:'Lo que sostiene todo lo demás. Se cocina una vez y dura años.',dishes:[
  {name:'Marca, alcance local',price:'$4,800',cell:'Identidad',note:'Lo mínimo para existir con coherencia.',items:['Logotipo','Tipografía','Colorimetría']},
  {name:'Marca, alcance medio',price:'$9,600',cell:'Identidad',note:'El sistema completo, con sus reglas escritas.',items:['Logotipo, tipografía y colorimetría','Manual de uso e identidad','Papelería institucional','Mockups y firmas electrónicas']},
 ]},
 {roman:'IV',title:'Digital',lead:'La oficina que abre cuando todo lo demás está cerrado.',dishes:[
  {name:'Sitio web',price:'desde $18,000',cell:'Experiencia',note:'Donde la confianza se establece más allá de las redes.',items:['Hasta 5 secciones y diseño responsivo','Sitio autoadministrable','Certificado SSL','Analytics y Search Console','Configuración SEO']},
  {name:'Tienda en línea',price:'desde $42,000',cell:'Experiencia',note:'Catálogo, cobro y envío resueltos de punta a punta.',items:['3 secciones institucionales','Alta de hasta 25 productos','Impuestos y correos transaccionales','Pasarela de pago','Diseño mobile first y SEO']},
 ]},
];

const extras=[
 {name:'Publicidad fuera de línea',cell:'Comunicación',items:['Campañas para medios tradicionales','Banners y señalética','Fotografía de producto','Marketing ferial y merchandising','Brochure y presentaciones']},
 {name:'Contenido',cell:'Comunicación',items:['Grabación y edición de video','Fotografía digital','Podcast y anuncios','Blogs, libros y ebooks','Plantillas para publicar en casa']},
 {name:'Capacitación',cell:'Cultura',items:['Atención al público','Neurociencias y neuroventas','Comunicación interna','Liderazgo y administración emocional','Estrategia de campañas']},
 {name:'Gestión de redes',cell:'Comunicación',items:['Asesoría mensual de crecimiento','Revisión de métricas','Identidad y book de perfiles']},
];

export default function MenuPage({onProject}:{onProject:(message?:string)=>void}){
 return <div className="carta-page">
  <section className="carta-hero page-width">
   <span>FRACTO / SERVICIOS 2026</span>
   <h1>Carta.</h1>
   <p>Consultoría estratégica y ejecución especializada, servidas por curso.</p>
  </section>
  <div className="carta-body page-width">
   {courses.map(course=><section className="carta-course" key={course.roman}>
    <header><b>{course.roman}</b><div><h2>{course.title}</h2><p>{course.lead}</p></div></header>
    <div className="carta-dishes">{course.dishes.map((dish,index)=><article className="carta-dish" key={dish.name}>
     <div className="carta-dish-title"><small>{String(index+1).padStart(2,'0')}</small><h3>{dish.name}</h3><i/><strong>{dish.price}</strong></div>
     <span>CÉLULA / {dish.cell}</span><p>{dish.note}</p>
     <ul>{dish.items.map(item=><li key={item}>{item}</li>)}</ul>
     <button className="carta-dish-cta" onClick={()=>onProject(`Hola, quiero solicitar una propuesta para “${dish.name}” de la Carta FRACTO.`)}>Solicitar una propuesta <Arrow/></button>
    </article>)}</div>
   </section>)}
   <section className="carta-course carta-extras">
    <header><b>V</b><div><h2>A la carta</h2><p>Se piden sueltas. Se cotizan según alcance.</p></div></header>
    <div>{extras.map(extra=><article key={extra.name}><h3>{extra.name}</h3><span>CÉLULA / {extra.cell}</span><ul>{extra.items.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div>
   </section>
  </div>
  <footer className="carta-note page-width"><span>FRACTO® / NOTA DE LA CARTA</span><p>Precios orientativos en pesos mexicanos (MXN). Son mensuales salvo que se indique otra cosa. La propuesta final confirma alcance, revisiones, vigencia, impuestos y cualquier costo externo de pauta, plataformas, producción o viáticos.</p><button className="button button-light" onClick={()=>onProject('Hola, revisé la Carta FRACTO y quiero solicitar una propuesta para mi organización.')}>Solicitar una propuesta por WhatsApp <Arrow/></button><small>MÉXICO / 2026</small></footer>
 </div>;
}
