# FRACTO

Sitio en español de una agencia creativa de marketing, desarrollado con React, TypeScript y Vite.

## Desarrollo

`npm install`

`npm run dev -- --host 127.0.0.1`

`npm run build` genera `dist/`. `npm run preview` permite revisar esa compilación.

## Implementación vigente

La composición A sigue siendo la autoridad visual, pero el sitio ya no concentra todo en una landing. La portada (`/`) funciona como recorrido editorial y enlaza a tres subpáginas: `/proyectos`, `/servicios` y `/estudio`. Cada ruta tiene una apertura y una cadencia propias. El trabajo real —Hotel Embrujo Boutique y Menos Dolor— conserva el crédito de la etapa Chulerías.

RAÍZ y TRAMA son marcas ficticias con imágenes conceptuales generadas con IA, declaradas en sus fichas. No representan clientes ni lanzamientos comerciales. El formulario descarga `mi-proyecto-fracto.txt` localmente, sin enviar ni almacenar datos en un servidor. El chat ofrece respuestas guiadas locales y muestra la entidad pequeña en blanco y negro; no utiliza una API de IA.

## Activos y diseño

`DESIGN.md` y `.impeccable/design.json` documentan el sistema construido. `public/assets/fracto-logo.svg` y `symbol.svg` son activos originales de marca; `public/fonts/archivo.woff2` es la fuente local. La UI utiliza WebP para portadas, detalles, conceptos, textura y avatar. Originales y procedencia permanecen junto a los derivados. Los archivos históricos de eclipse no pertenecen a la UI activa.

`scripts/optimize-agency.mjs` recibe como argumento la ruta de un paquete `sharp` ya instalado; no se añadió dependencia npm. Las portadas iniciales, grano y avatar suman 410.722 bytes frente a 5.564.940 antes de optimizar (~92,6% menos). Los conceptos con carga diferida suman 426.816 bytes. Son pesos de esos activos, no una medición de rendimiento completa de la página.

## Verificación de esta versión

Build TypeScript/Vite válido: JS 223,37 kB (gzip 69,28 kB), CSS 31,76 kB (gzip 7,32 kB). Se verificaron las cuatro rutas, breadcrumb, progreso de lectura, filtros del portafolio, índice compacto y ficha expandida en móvil; navegación SPA, menú móvil, carga directa y consola limpia. El ancho de documento queda dentro del viewport. El detector de layout no mostró hallazgos.

La revisión pidió corregir el corte de textura y el peso de raster; ambas correcciones se implementaron y el veredicto acotado fue ship. El detector no mostró hallazgos antes del lote de corrección; no se repitió después. Esto no es una certificación completa de accesibilidad. Las auditorías y capturas anteriores describen versiones sustituidas.

## Antes de publicar

Confirmar dominio, hosting y canales reales de contacto. Cualquier envío remoto o IA conectada requiere una integración de servidor separada y credenciales fuera del cliente. No inventar correo, redes, resultados o métricas.
