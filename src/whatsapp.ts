export const WHATSAPP_NUMBER='5218713292842';

export function whatsappUrl(message='Hola, conocí FRACTO por su sitio. Quiero conversar sobre un reto de mi organización.'){
 return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message?:string){
 window.open(whatsappUrl(message),'_blank','noopener,noreferrer');
}
