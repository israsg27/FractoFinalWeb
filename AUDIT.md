# Auditoría FRACTO — 26 septiembre 2026

> Histórica: este informe describe la versión anterior a la reconstrucción basada en las referencias de semitonos, tipografía difusa y símbolo espectral. No es una auditoría de la interfaz actual. Véanse DESIGN.md y .impeccable/reference-direction.md para la dirección vigente.

## Dictamen

Sistema visual coherente: una agencia creativa oscura, editorial y minimalista. La revisión combina lectura del código, detector estático y pruebas locales de escritorio y móvil. No es una certificación WCAG ni una prueba de todos los navegadores.

| Dimensión | Evaluación después de cambios |
| --- | --- |
| Accesibilidad | 3/4: foco visible, diálogos nativos, etiquetas, errores nativos y áreas táctiles reforzadas; falta prueba con lector de pantalla |
| Rendimiento | 3/4: fuentes locales, textura estática reutilizada y sin animación continua del grano; falta medición en dispositivo físico |
| Responsive | 3/4: 1280 y 390 px comprobados sin overflow horizontal; faltan dispositivos y zoom ampliado |
| Theming | 3/4: paleta base compartida; los estudios conservan colores propios y quedan valores literales secundarios |
| Integridad | 4/4: conceptos y asistente guiado identificados, descarga local explícita, sin clientes o métricas inventados |
| Total orientativo | 16/20 — Bueno; listo para revisión visual del cliente, no para anunciar integración comercial completa |

## Hallazgos y correcciones

- **P2 — Áreas de interacción pequeñas.** En styles.css, cierre de diálogos, logo, menú, flechas del portafolio, rango y acciones móviles tenían objetivos menores de 44px. Se ampliaron sin aumentar la escala visual del icono. Se preservan foco y estructura nativa.
- **P2 — Menú sin cierre por Escape.** App.tsx incorpora Escape, devolución de foco al botón y aria-controls. Abrir el formulario también cierra el menú.
- **P2 — Legibilidad secundaria.** Metadatos de proyectos, notas, footer y detalles móviles se ampliaron. Se conserva la jerarquía sin convertir información necesaria en decoración diminuta.
- **P2 — Campos requeridos poco claros.** ProjectForm.tsx indica campos obligatorios y el carácter local de la descarga antes de completar la tarea. La validación nativa enfoca el primer campo inválido.
- **P2 — Propuesta de agencia implícita.** EditorialHero.tsx explica desde el primer párrafo que FRACTO es una agencia creativa de estrategia, diseño y tecnología.
- **P3 — Textura demasiado débil y costosa al redimensionar.** components.tsx genera una muestra de grano de 256px una sola vez y la repite sin regenerar ruido por cada píxel del viewport. La opacidad se ajusta para percibir material sin tapar el contenido.
- **P3 — Exceso de etiquetas sobre titulares.** Se conservan etiquetas accesibles pero se retiran del plano visual, manteniendo separadores y títulos.
- **P3 — Código de animación sin uso.** Se retiró Reveal y su importación de Framer Motion del componente compartido. No se eliminaron dependencias o archivos históricos ajenos al cambio.

## Detector y juicio

El detector inicial devolvió 97 avisos, principalmente diferencias entre el inventario de DESIGN.md y valores CSS. No se interpretan como 97 fallos de usuario. Bodoni ya estaba descrita en la documentación narrativa: su aviso es una discrepancia del inventario, no una fuente ajena a la identidad. Las paletas de NOVA, UMBRA y ORIGEN son intencionales; no se reemplazaron por los colores del sitio. Se mantuvo una sola hoja activa.

## Evidencia

- Compilación TypeScript/Vite satisfactoria.
- Escritorio: 1280px; contenido medido en 1265px, sin overflow.
- Móvil: 390px; contenido medido en 375px, sin overflow.
- Menú: Escape devuelve aria-expanded a false.
- Formulario vacío: primer campo inválido y foco en name. Con datos ficticios, se activa el estado de descarga local. No se verificó el contenido del archivo descargado.
- Texto secundario de la paleta: 8.08:1 contra fondo y 7.35:1 contra superficie; esto no sustituye la revisión de cada combinación del sitio.
- Capturas: .impeccable/review/audit-desktop.png y audit-mobile.png.

## Pendientes antes de publicar

- **P1 de preparación comercial, no regresión:** el brief no llega al equipo. Se necesita un destino de contacto autorizado o backend antes de ofrecer envío. La interfaz no afirma que lo envía.
- **P2:** reemplazar los estudios conceptuales por casos reales aprobados cuando estén disponibles.
- **P2:** validar lectores de pantalla, zoom 200%, otros navegadores y rendimiento móvil real.
- **P3:** completar el inventario de tokens si el sistema se amplía; no confundir avisos documentales con defectos visuales.

Se mantienen el fondo oscuro, el chatbot pequeño monocromático, el foco visible, las etiquetas locales honestas y la alternativa de movimiento reducido.
