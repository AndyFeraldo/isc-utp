# Panel ISC UTP · Impact Startup Competition 2027 — Programa Local UTP

Contexto para Claude Code. El usuario (Andy, organizador) **no sabe programar**: explica en
**español sencillo**, sin jerga, y haz tú los pasos técnicos (git, publicar, base de datos).

## Qué es
Panel para que los jurados califiquen los pitches de la ISC UTP 2027, los equipos suban su
presentación y la sala proyecte el pitch con cronómetro. Tiene casi las mismas mecánicas del
**Panel Maestro del VI CONCEPMI** (`AndyFeraldo/concepmi-jurados`), pero es un **proyecto aparte**.

- Repositorio: `AndyFeraldo/isc-utp` (público).
- Publicación: GitHub Pages → `https://andyferaldo.github.io/isc-utp/`
- Modo de prueba: agregar `?demo` a la dirección (`…/isc-utp/?demo`). Todo se guarda solo en ese navegador.

## Regla n.º 1: no se toca nada del CONCEPMI
El repositorio `concepmi-jurados` y su base de datos (`jur_*`) solo se **leen como referencia**.
Todo lo de ISC va en este repositorio y con datos propios (tablas `isc_*`).

## Reglas de trabajo (acordadas con Andy)
- **El código de administrador lo tiene solo Andy.** No escribirlo nunca en ningún archivo del
  repositorio, porque es público. En la puerta Admin se escribe **oculto** (puntitos) con un botón 👁
  para mostrarlo, porque Andy comparte pantalla.
- **Nunca borrar datos reales** (jurados, equipos, integrantes, calificaciones) con migraciones. Nada de
  `DROP TABLE`, `TRUNCATE` ni `DELETE` sobre esas tablas. Antes de cualquier cambio de base de datos,
  explicar qué hace y **confirmar con Andy**.
- **Cambiar la versión** de los archivos antes de cada publicación, para que los navegadores no usen
  copias viejas (GitHub Pages las guarda hasta 10 min):
  `V=$(date -u +%Y%m%d%H%M); sed -i -E "s#(from \"\./[a-z-]+\.js)(\?v=[0-9]+)?\"#\1?v=$V\"#g" js/*.js; sed -i -E "s#(js/app\.js|css/estilos\.css)(\?v=[0-9]+)?\"#\1?v=$V\"#" index.html`
- Probar todo en **modo de prueba** antes de publicar, también en celular (sin desplazamiento horizontal).
- Commits en español.
- Los documentos internos (bases en PDF, Excel de rúbrica) **no** van al repositorio.

## Flujo
1. Cambios en esta carpeta → probar en local (`python -m http.server 8765` y abrir `http://localhost:8765/?demo`).
2. Cambiar la versión (comando de arriba), `git add`, `commit` en español y `push` a `main`.
3. GitHub Pages se actualiza solo en 1 o 2 minutos.

## Estructura
- `index.html`: entrada; activa el modo de prueba con `?demo` (`window.__ISC_DEMO__`), carga `vendor/` y `js/app.js` (módulos ES, sin compilación).
- `js/rubrica.js`: **fuente única** de la competencia (etapas, ejes, tiempos, reglas de equipo) y de la rúbrica (5 criterios, 100 pts, niveles y preguntas guía). Sale de las bases, **no** del Excel.
- `js/app.js`: portada con 4 puertas (Jurado, Equipo, Proyección, Admin) y pedido del código.
- `js/api.js`: llamadas a Supabase (`isc_*`) y modo de prueba en `localStorage` (códigos ADMIN1, JUR001–JUR003, EQ0001, PROY01).
- `js/config.js`: URL y clave anon de Supabase (pública por diseño). **Vacías** hasta crear la base.
- `js/ui.js`: utilidades comunes (copiado del CONCEPMI).
- `css/estilos.css`: estilos del CONCEPMI + bloque final **«ISC UTP · identidad»** con los colores (provisionales).
- `img/`: logos de Impact Startup Competition y Scale **limpiados** (se les quitó el fondo de cuadritos pintado; Scale sin la frase, que va como texto). Ícono ISC provisional.

## La competencia (según las bases)
- Desafío: «Amazonía Viva: Innovación para Conservar, Prosperar y Transformar». Ejes: Bioeconomía, Biodiversidad, Comunidades Amazónicas.
- Equipos de 2 a 5 (máx. 1 externo y máx. 1 egresado), un líder. Composición fija desde la Semifinal.
- Semifinal Local: miércoles 25/11/2026, 7:00–9:15 p. m., Zoom; pasan 3. Final Local: sábado 28/11/2026, 9:30 a. m.–12:30 p. m., presencial; gana el 1.º.
- Tiempo por equipo: 5 min de pitch + 4 min de preguntas + 1 min de cambio (el admin podrá cambiarlo).
- Walkover si un equipo no se presenta en su turno. En la Semifinal cada equipo recibe su puntaje y los comentarios del jurado.

## Rúbrica y cálculo
- c1 Equipo 30 · c2 Idea 25 · c3 Impacto y Desafío 2027 20 · c4 Evidencia de Experimentación 15 · c5 Viabilidad 10.
- Niveles: Excelente 100 %, Muy bueno 80 %, Bueno 60 %, Regular 40 %, Deficiente 20 % del peso. No presentó = 0.
- El jurado elige un nivel por criterio + justificación corta obligatoria + comentario general para el equipo.
- Puntaje = promedio de sus jurados sobre 100, mostrado entero. Semifinal y Final se califican por separado.
- Desempate: 1) promedio exacto, 2) criterio de mayor peso (Equipo → Idea → Impacto…), 3) decisión del jurado en sala con motivo obligatorio.

## Arquitectura prevista (igual que el CONCEPMI)
- GitHub Pages + Supabase. RLS activado y sin políticas: todo pasa por funciones `security definer` que validan el código.
- Archivos en un espacio privado de Storage, con enlaces temporales que entrega una función Edge.
- Tablas sugeridas: `isc_config`, `isc_etapas`, `isc_criterios`, `isc_jurados`, `isc_equipos`, `isc_integrantes`,
  `isc_calificaciones`, `isc_ajustes`, `isc_desempates`, `isc_borrados`, `isc_presentaciones`, `isc_accesos`, `isc_sorteos`.

## Avance
1. ✅ Base: portada con logos, 4 puertas, modo de prueba, rúbrica oficial, este archivo.
2. ⏳ Supabase (pendiente de confirmar con Andy: proyecto nuevo recomendado).
3. Admin: Equipos y Jurados. 4. Jurado. 5. Resultados. 6. Equipo. 7. Proyección. 8. Accesos limitados. 9. Pruebas completas antes del 25/11/2026.

## Pendientes de Andy
- Logo de **ISC UTP** y **colores de la marca** (HEX). Logos de Scale e Impact en PNG transparente o SVG (los actuales se limpiaron a mano).
- ¿Supabase nuevo o el mismo del CONCEPMI con tablas `isc_`? ¿4 min o 1 min de preguntas?
- ¿Cuántos jurados por etapa? ¿Los mismos en Semifinal y Final? Fecha y hora límite para subir el PDF.
- ¿La Semifinal por Zoom se proyecta compartiendo la pantalla del panel? ¿Los equipos ven sus resultados en el panel o Andy les envía el reporte?
