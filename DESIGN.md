---
name: FRACTO
description: Agencia creativa de marketing; pensar distinto y hacerlo realidad.
colors:
  bg: "#0a0a0a"
  ink: "#f3f2ef"
  muted: "#aaa9a6"
  line: "#303030"
  dialog: "#141414"
  hover: "#d9d8d4"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(60px,8.05vw,132px)"
    fontWeight: 720
    lineHeight: 0.88
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(32px,3.5vw,56px)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-.04em"
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "16px"
    lineHeight: 1.65
  label:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "10px"
    lineHeight: 1.6
    letterSpacing: ".04em"
rounded:
  square: "0"
  media: "8px"
  circle: "50%"
spacing:
  edge-desktop: "3.55vw"
  edge-mobile: "5.4vw"
  section-desktop: "70px"
  section-mobile: "55px"
components:
  button-light:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
    padding: "14px 31px"
    rounded: "{rounded.square}"
  button-outline:
    textColor: "{colors.ink}"
    padding: "14px 31px"
    rounded: "{rounded.square}"
  button-hover:
    backgroundColor: "{colors.hover}"
    textColor: "{colors.bg}"
  field:
    padding: "10px 0"
    rounded: "{rounded.square}"
    textColor: "{colors.ink}"
  dialog:
    width: "min(640px,calc(100% - 32px))"
    backgroundColor: "{colors.dialog}"
---
# Design System: FRACTO

## Overview

**Creative North Star: "Evolucionar desde la estrategia y hacerlo visible."**

FRACTO presenta un estudio de estrategia creativa en español, sucesor de Chulerías. La experiencia combina negro texturado, titulares grotescos contundentes, geometría editorial y materia de cristal iluminada. El arco monocromo del hero y el recipiente que se llena con el scroll forman una misma metáfora de dirección y evolución.

La autoridad visual es `.impeccable/mocks/agency/agency-a.png`, seleccionada explícitamente por el usuario; su aplicación está descrita en `.impeccable/agency-direction.md`. El logo y símbolo son los SVG oficiales originales, y las piezas reales sustituyen las imágenes inventadas de la maqueta. La insignia Canvas de la captura no pertenece al sitio. Esta documentación reemplaza como sistema activo la dirección rechazada de eclipse y experimentos.

**Key Characteristics:**

- Negro con textura discreta y continua.
- Archivo de gran escala y controles rectangulares claros.
- Trabajo real acreditado como evidencia; no compite con la propuesta de valor.
- Un recipiente de cristal FRACTO pasa de vacío a lleno según el progreso del scroll.
- El contenido se organiza alrededor de rumbo, cultura, experiencia, comunicación e identidad.
- Entidad monocroma pequeña, exclusivamente en el chat.

## Colors

La paleta de interfaz es neutral: fondo carbón, tinta casi blanca, texto secundario gris y reglas oscuras. El color procede de fotografías y proyectos conceptuales, sin trasladarse a botones o fondos generales. La superficie del diálogo separa la tarea del contenido; el hover claro refuerza las acciones.

**The Project Color Rule.** El color expresivo pertenece a los proyectos; la interfaz y la marca permanecen neutrales.

## Typography

Archivo local (`public/fonts/archivo.woff2`) sostiene toda la interfaz, con Arial y sans-serif de respaldo. El display es pesado, compacto y de dos líneas; el cuerpo utiliza espaciado cómodo y contraste secundario. Los metadatos usan la misma familia, no una monoespaciada.

El hero muestra «Pensar distinto. Hacerlo realidad.». El sistema usa aperturas de página a escala display y capítulos con cambios marcados de densidad. En móvil el hero pasa a `clamp(38px,10.5vw,54px)`; las aperturas interiores usan `clamp(45px,13vw,65px)`. Los números de ruta y método usan cifras tabulares.

## Layout

Márgenes fluidos y contenedor de 1800px. La cabecera sticky de 72px conecta cuatro rutas reales: `/`, `/proyectos`, `/servicios` y `/estudio`. La portada es un prólogo editorial en cinco escenas: hero, manifiesto claro, trabajo inmersivo, capacidades con columna sticky y puente de estudio. El hero incorpora metadatos de estudio y un campo de señal monocromo construido con fragmentos de proyectos reales y conceptuales; el índice de práctica añade densidad informativa sin inventar métricas. Cada subpágina abre con un viewport propio y contiene solo la profundidad pertinente a su tema.

El ritmo alterna vistas de 80–100svh, pausas de texto, medios amplios y regiones densas. Proyectos usa un índice editorial asimétrico 1.18/.82 con portadas compactas; el caso seleccionado se expande junto a su portada, sin bandas vacías. En móvil se convierte en una secuencia de una columna y la ficha se abre inmediatamente debajo. Servicios combina índice sticky, acordeones y método sobre superficie clara; Estudio narra la evolución, principios y equipo.

## Elevation & Depth

La profundidad procede de textura y fotografía, sin sombras de tarjetas. `agency-grain.webp` se repite verticalmente con opacidad .28 sobre un pseudo-elemento absoluto; el body relativo lo ancla a toda la altura del documento. No debe terminar al final del primer viewport.

El diálogo usa borde y backdrop negro translúcido con desenfoque de 5px. Las flechas se desplazan 4px al hover; fotografías de casos escalan a 1.035. La curva compartida es `cubic-bezier(.16,1,.3,1)`. Movimiento reducido elimina animaciones y transiciones y desactiva el desplazamiento suave; no se promete ausencia de todo cambio de estado.

## Shapes

Controles y diálogos rectangulares, campos subrayados, reglas finas. Solo medios de proyectos y conceptos usan esquinas suavizadas; la entidad del chat tiene recorte circular. No convertir cada sección en una tarjeta.

## Components

- Acciones: botón claro y variante de contorno, altura mínima 52px en escritorio y 48px en móvil. Flecha SVG, hover claro y foco visible de 2px con separación de 6px. Enlaces editoriales con línea inferior.
- Navegación: Inicio, Proyectos, Servicios y Estudio son rutas con History API y soporte de atrás/adelante; Hablemos abre el brief. Menú móvil con `aria-expanded`, cierre por cambio de ruta o Escape y retorno de foco por Escape.
- Casos: Hotel Embrujo Boutique y Menos Dolor. Botones con estado expandido abren una ficha dentro de la página, con pieza íntegra, crédito Chulerías y enlace al archivo original. Hotel utiliza recorte de portada; Menos Dolor conserva la pieza completa sobre azul petróleo.
- Servicios: cuatro acordeones nativos agrupados por `name="services"`, con descripción, entregables y CTA. El símbolo + cambia a − al abrir.
- Método: Escuchar, Enfocar, Crear y Activar; botones con `aria-pressed` y un panel con anuncio cortés del cambio.
- Conceptos: RAÍZ y TRAMA, imágenes y fichas nativas expandibles. Conservar «Proyecto conceptual» y declaración de marca ficticia e imágenes generadas con IA.
- Diálogos: modal nativo para brief y chat, altura máxima 88svh, cierre por Escape, botón y backdrop; restaura foco y scroll al cerrar.
- Formulario: etiquetas, validación nativa, línea inferior, altura mínima 44px y estado de descarga. Genera `mi-proyecto-fracto.txt` localmente; no envía ni almacena información en un servidor.
- Chat: entidad de 48px en escritorio y 44px en móvil, monocroma, con respuestas guiadas locales. No hay API de IA conectada.
- Utilidades: progreso de lectura de 2px en el borde superior; breadcrumb editorial FRACTO/ruta en aperturas interiores; filtro sticky del portafolio con estados `aria-pressed`, conteos reales y anuncio cortés del resultado.

## Do's and Don'ts

- Do mantener español, posicionamiento de agencia y acciones claras.
- Do conservar logo y símbolo originales, crédito Chulerías y procedencia de activos.
- Do usar los derivados WebP en la UI y conservar sus originales y sidecars.
- Do distinguir casos reales, conceptos ficticios y funciones locales.
- Don't recuperar eclipse o laboratorio como dirección principal.
- Don't colocar la entidad en el hero ni como arte de sección.
- Don't inventar clientes, resultados, métricas ni canales de contacto.
- Don't presentar una revisión visual acotada como certificación completa de accesibilidad.
