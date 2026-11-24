# VICE MAPS | Registro acumulativo V06
Fecha: 24 de noviembre de 2026. Estado de código, no certificación de funcionamiento en dispositivo.

| Apartado | Incorporado en V01–V06 | Pendiente o limitado |
|---|---|---|
| A. Cartografía | Mapa vectorial, perspectiva, zoom, rotación, edificios 3D, nombres, agua, espacios verdes, brújula, temas día/atardecer/noche, controles de edificios y etiquetas. | Relieve, satélite, medición, interiores, pisos, calidad del aire, alertas meteorológicas, fotorrealismo; transición solar gradual. |
| B. GPS | Posición en vivo; navegación activa giro a giro; voz en español si disponible; próximo giro y calle; distancia y tiempo restante, ETA sin tráfico; velocímetro, cámara adaptativa, orientación por sensor o desplazamiento; ajuste aproximado a la ruta; detección de desvío con tres lecturas precisas; recálculo online; rotondas y carriles cuando el motor los devuelve; llegada, listado de giros, silencio, recentrado y salida. | Pruebas de conducción y voz iPhone; ajuste profesional a red vial, velocidad máxima, exceso de velocidad, iconos alternativos de vehículo, música, puntos de referencia, segundo plano y pantalla bloqueada. |
| C. Rutas | Auto, bici y a pie vía OSRM; origen independiente por búsqueda, coordenadas, guardado o centro; hasta ocho paradas ordenables, editables y eliminables, inversión, itinerarios guardados y compartidos; recálculo conserva las paradas pendientes. TomTom opcional: moto (beta), preferencias de peajes/autopistas/ferris/caminos sin pavimentar, más corta y eco, predicción por horario con paradas. Alternativas simples con comparación temporal cuando el motor las devuelve. | Moto y preferencias requieren clave autorizada; las restricciones son preferencias y no garantías. Alternativas para multiparada, optimización automática del orden, accesibilidad, combustible, tarifas, llegada objetivo y validación real pendientes. |
| D. Búsqueda | Photon por texto, sugerencias con pausa, sesgo geográfico, historial local, selección de puntos por pulsación larga. V06: exploración categórica Overpass, radio GPS/centro, área visible, filtros locales y fichas enriquecidas por ID OSM. | Coordenadas escritas en el buscador principal (ya disponibles en el editor de recorrido), geocodificación inversa, voz, fotos, IA, mejoras de precisión. |
| E. Lugares | 36 categorías con SVG propios, marcadores y fichas OSM; búsqueda por radio/área, nombre, accesibilidad, horario interpretable, orden por distancia/nombre; teléfono, web, dirección, horarios, datos hoteleros, cocina, reservas/menú y otros campos cuando existen. Fotos Commons bajo demanda con licencia comprobable. Enlaces a OSM y Google Maps; componente oficial Google Places UI Kit opcional para consultar valoraciones. | Datos dependen de cobertura OSM; horarios estimados o desconocidos según reglas y zona; fotos solo si existe referencia y licencia. Google UI Kit requiere clave y facturación, no probado con credenciales; no se copian reseñas o puntuaciones en el mapa. Precios actuales, concurrencia, espera, pedidos integrados y reseñas completas pendientes. |
| F. Transporte público | V06: categorías de paradas y estaciones OSM, sin módulo específico de rutas u horarios. | Paradas, líneas, horarios, combinaciones, tarifas y tiempo real vía GTFS donde exista. |
| G. Tráfico | Adaptador TomTom: capas de congestión e incidentes, rutas optimizadas y predicción histórica, estimación de demora, revisión opcional cada 3 min para ruta rápida sin paradas y oferta de alternativa si ahorra ≥2 min y ≥12% frente al ETA restante previo. | Requiere clave, cobertura, condiciones y cuota; pruebas con tráfico real pendientes; revisión periódica con paradas y criterios eco/corta, fichas detalladas de incidentes, velocidad por segmento, reportes y actualización exacta del ETA de la misma ruta pendientes. |
| H. Guardados | Favoritos, Casa, Trabajo, Quiero visitar; recientes; eliminar lugares y recientes. | Listas personalizadas, notas, estacionamiento, guardar geometrías de múltiples rutas (ya se guardan itinerarios de puntos), exportación, sincronización, colaboración. |
| I. Offline | Geometría, pasos y datos de ruta OSRM persistidos localmente; TomTom en memoria mientras la sesión siga abierta, sin persistencia de resultados del proveedor; progreso e instrucciones en pantalla sin conexión mientras se dispone de la posición GPS; desvío sin recálculo offline; shell cacheado y precarga del motor cuando la conexión lo permite. | Descarga automática del corredor, teselas y fuentes offline, garantía de arranque frío, validación real de guía y síntesis de voz offline, gestión de descargas. No recalcula offline. |
| J. Street View | Descartado por usuario. | No se desarrollará Street View, panorámicas ni realidad aumentada. |
| K. Historial | Recientes de búsqueda. | Historial de viajes, estadísticas, calendario, registro de posición, exportación, modo incógnito. |
| L. Compartir | Compartir punto o destino vía menú nativo si está disponible o portapapeles. | Compartir enlace importable de itinerario (ya se comparte texto con paradas y destino), ubicación en tiempo real, seguimiento, reportes, aportes. |
| M. iOS | PWA instalable, icono aportado por el usuario (180/192/512 px), pantalla completa, GPS, interfaz táctil, solicitud de mantener pantalla encendida con Wake Lock si compatible. | segundo plano, notificaciones, Siri, widgets, CarPlay, Watch, Dynamic Island. |
| N. IA | Sin asistente inteligente. | Búsquedas naturales, planificación, recomendaciones y asistencia. |

## Condiciones maestras
- Mantener estética GTA VI, sin perder funcionalidades de versiones anteriores.
- Priorizar uso personal gratuito y fuentes legítimas; no extraer datos del código interno de Google ni presentar datos ficticios.
- Tráfico: evaluar TomTom/HERE para rutas actuales y futuras con datos históricos; comprobar cobertura local, atribución y límites. Waze requiere acceso de socio. Sin clave autorizada se mantiene OSRM sin tráfico.
- Offline: conservar ruta automáticamente y mantener GPS; no exigir recálculo offline. Descargas cartográficas deben respetar condiciones del proveedor.
- Reportar incorporado, parcial, pendiente, dependencias, bloqueos y pruebas reales con cada versión.
- V03: navegación activa implementada con pruebas simuladas. V04: integración TomTom opcional, condicionada a clave, autorización de uso, cuota y cobertura; sin clave sigue OSRM. V05: planificación avanzada incorporada con límites indicados. V06: establecimientos, iconografía y valoraciones opcionales; V07: descarga automática del corredor cartográfico.

## Referencias técnicas
https://openfreemap.org/tos/
https://github.com/komoot/photon
https://routing.openstreetmap.de/about.html
https://docs.tomtom.com/pricing
https://docs.tomtom.com/routing-api/documentation/tomtom-maps/v1/calculate-route
https://docs.here.com/routing/docs/routing-v8-traffic-in-routing
https://developers.google.com/maps/documentation/places/web-service/policies

## Validación V03
- Pruebas Node: geometría, proyección, avance, tiempos, rotonda, giro en U, desvío, llegada y ruta inválida; controlador con GPS y servicios simulados: iniciar, giros, velocidad, salida de ruta sin conexión, recálculo online y llegada.
- Sintaxis de todos los JS, referencias HTML y manifiesto; integridad del ZIP.
- No se pudo acceder a servicios externos desde el entorno; Chromium bloqueó la navegación de prueba. No se comprobó mapa real, renderizado visual, audio real, caché offline en Safari, ni GPS de iPhone. Prototipo experimental: probar estacionado o como acompañante antes de usar en conducción.
- Motor OSRM: https://project-osrm.org/docs/v5.24.0/api/
- Wake Lock: https://developer.mozilla.org/en-US/docs/Web/API/WakeLock
- GPS: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition

## Cambios V04 y validación
- TomTom Routing v1: `traffic=true` para salida ahora; `traffic=false` + `departAt` futuro (perfiles históricos, hasta 60 días en la interfaz). La predicción se muestra por separado y no reemplaza la ruta activa.
- Rutas adaptadas al motor de giros V03; voz según navegador; carriles TomTom aún no adaptados (se mantienen los de OSRM). Selección por tiempo estimado. La opción de revisión cada tres minutos está desactivada inicialmente; durante la navegación solicita alternativas, propone cambios sin aplicarlos automáticamente y compara con la estimación restante anterior, no con una nueva medición de la ruta exacta. No operar la interfaz mientras conducís.
- Capas TomTom raster de flujo relativo e incidentes, con fuente visible; se desactivan sin conexión. Colores de la ruta rosa se conservan. Sin información visible no significa vía libre. No se archivan capas ni respuestas del proveedor. La ruta TomTom se conserva en memoria en la sesión activa sin Internet, no después de cerrar/recargar la app; OSRM conserva persistencia local.
- Clave propia opcional, almacenada en el dispositivo (visible a scripts del origen, no secreto de servidor), no incluida en el proyecto. Configurar restricciones de dominio, servicios y consumo en el panel del proveedor. Límite de 100 llamadas de ruta por sesión local (no controla teselas ni garantiza límite de facturación). Desactivar capas y revisión si no se necesitan. Consultar términos vigentes, autorización de uso giro a giro con mapa externo y atribución específica antes de activar.
- Validación: sintaxis JS, IDs y archivos referenciados, manifiesto, pruebas V03 y pruebas nuevas con respuestas sintéticas de TomTom: parámetros, horarios, adaptación, ranking, instrucciones, ETA y umbral de alternativas. No se dispone de clave ni de iPhone; no se verificó respuesta real, capa visual, cobertura por calle, CORS, voz ni GPS real. No hay prueba de integración de extremo a extremo.
- Referencias: https://docs.tomtom.com/pricing ; https://docs.tomtom.com/routing-api/documentation/tomtom-maps/v1/calculate-route ; https://docs.tomtom.com/routing-api/documentation/tomtom-maps/v1/guidance-instructions ; https://docs.tomtom.com/traffic-api/documentation/tomtom-maps/v1/traffic-flow/raster-flow-tiles ; https://docs.tomtom.com/traffic-api/documentation/tomtom-maps/v1/traffic-incidents/raster-incident-tiles ; https://docs.tomtom.com/traffic-api/documentation/tomtom-maps/v1/product-information/market-coverage ; https://docs.tomtom.com/legal/terms-and-conditions

## Cambios y validación V05
- Editor de recorrido con origen independiente, destino editable y hasta 8 paradas intermedias. Búsqueda explícita Photon, coordenadas `latitud, longitud`, guardados o centro del mapa. Orden manual, inversión, guardado local de hasta 30 itinerarios (solo puntos/preferencias, no resultados TomTom), compartir texto. El origen dinámico Mi ubicación usa GPS si está disponible y centro del mapa si no. Los cambios invalidan la ruta anterior para evitar incoherencias.
- OSRM admite ruta ordenada multipunto en auto/bici/a pie, sin clave; el cálculo de alternativas en V05 se solicita solo para recorridos sin paradas. TomTom opcional: moto beta, evitar peajes, autopistas, ferris y caminos sin pavimentar; criterios más rápida, más corta y eco. Las preferencias `avoid` son solicitudes al motor, no garantía de exclusión. Las rutas eco no tienen estimación de litros ni precio. No se degrada una solicitud avanzada a OSRM sin avisar; se rechaza si no hay proveedor compatible. Si falla TomTom, únicamente se permite OSRM para perfiles y preferencias básicos compatibles.
- El GPS verifica proximidad al punto ajustado a la red y avance respecto del tramo para reconocer cada parada. No termina hasta alcanzar todas y llegar al destino. El recálculo por desvío conserva paradas aún pendientes y preferencias. Si se omite una parada sin conexión, permanece pendiente. El inicio desde un origen manual requiere GPS a menos de 150 m del origen calculado. Las paradas alcanzadas se registran durante la sesión; reanudar después de cerrar no conserva necesariamente ese progreso.
- Se desactiva la revisión periódica de tráfico para rutas con paradas o criterios no rápidos, para no sugerir alternativas incompatibles. Se conserva revisión de rutas rápidas directas con las restricciones elegidas. El recálculo por desvío permanece operativo. La predicción TomTom usa origen, paradas, perfil y preferencias. No hay cambio automático de orden ni cálculo de rutas alternativas multiparada.
- Pruebas Node: 5 suites, incluidas las 3 de V03/V04 y dos nuevas para coordenadas, límites, URL multipunto, restricciones, ranking, adaptación de respuestas sintéticas, maniobras intermedias, seguimiento simulado, llegada y parada omitida offline. No se comprobó CORS, respuestas reales, tráfico, renderizado, GPS o voz en iPhone. El comportamiento de TomTom requiere clave y condiciones compatibles. No usar como único navegador hasta probarlo estacionado o como acompañante.
- Referencias: https://project-osrm.org/docs/v5.15.2/api/ ; https://docs.tomtom.com/routing-api/documentation/tomtom-maps/v1/calculate-route


## V06 — Establecimientos, valoraciones e iconografía

🟢 Código incorporado: 36 categorías con símbolos SVG originales inspirados en la referencia del usuario (cuadrado pastel, borde oscuro, símbolo monocromático). No se modificaron los iconos de instalación. Consulta Overpass por etiquetas OSM, radio de 500 m/1/2/5 km alrededor de GPS o centro, o límites visibles (se exige acercar si el área es grande). Se consultan hasta 251 objetos para detectar truncamiento; se ordenan hasta 250 y muestran hasta 60. No es un censo exhaustivo ni garantiza que estén los más cercanos si la consulta se trunca. Consultas explícitas, pausa de 2,5 s, caché temporal en memoria de 3 min y hasta 12 consultas, cancelación al cambiar de búsqueda.

🟢 Filtros por nombre, distancia/nombre, accesibilidad explícita y estado de horario interpretable. No se excluye permanentemente lo desconocido: desactivar filtros para ver más resultados. Fichas con los campos OSM presentes, enlaces, llamada, coordenadas y distancia recta. Photon conserva búsqueda de direcciones y se enriquece por ID OSM al elegir un resultado.

🟡 Horarios: 24/7 y subconjunto conservador de reglas semanales, intervalos y cruces de medianoche. Feriados, excepciones, reglas superpuestas u otros formatos complejos quedan desconocidos. Sin zona horaria, solo se evalúa 24/7, salvo si el GPS está a menos de 25 km y puede aproximarse con hora del dispositivo (se etiqueta como estimada). No es confirmación en vivo ni contempla cierres imprevistos.

🟡 Fotografías: solo archivos referenciados por OSM; vista previa de Commons al solicitarla, con autor y licencia reconocida y enlace al original; si falta metadata o licencia se ofrece enlace. No se buscan fotografías por similitud ni se reutilizan fotos de Google.

🟡 Valoraciones: enlace gratuito a ficha/búsqueda externa de Google Maps (verificar coincidencia), y panel opcional que carga Google Places UI Kit únicamente tras introducir una clave de navegador y aceptar explícitamente una consulta. El widget muestra resultados de búsqueda con nombre, dirección y puntuaciones oficiales cuando existan. No se asume coincidencia exacta ni se extraen, almacenan o mezclan puntuaciones. La clave permanece en memoria de sesión y es visible para el navegador; restringir por dominio y API en Google Cloud. Requiere proyecto con facturación; no está activo por defecto, no es garantía de gratuidad, ni se ha verificado con clave real. Foursquare ofrece datos Premium sujetos a precio; no integrado. No hay reseñas completas internas, ni precios/concurrencia/espera en vivo.

## Verificación V06
- Sintaxis de todos los JS, IDs únicos, referencias HTML/manifest/Service Worker y seis suites Node (cinco heredadas más places.test.cjs) correctas.
- Intento de ejecutar Chromium con servicios simulados bloqueado por política del entorno (ERR_BLOCKED_BY_ADMINISTRATOR); no se certifica navegador, WebGL, CORS, cobertura, Google UI Kit, fotos reales ni Safari/iPhone. Se incluye tests/browser-smoke.py como prueba reproducible pendiente de ejecución local.
- Se conservan sin cambios los módulos nav-core, navigation, traffic-core, traffic, plan-core, planning, manifest e iconos de instalación originales. Cambios de integración en app.js, index.html, style.css y sw.js. Nuevos places-core.js, places.js, ratings.js y privacidad.html.

## Fuentes de V06
- https://dev.overpass-api.de/overpass-doc/en/preface/commons.html
- https://dev.overpass-api.de/command_line.html
- https://wiki.openstreetmap.org/wiki/Key:opening_hours
- https://commons.wikimedia.org/wiki/Commons:Machine-readable_data
- https://developers.google.com/maps/documentation/places/web-service/policies
- https://developers.google.com/maps/architecture/places-ui-kit-getting-started
- https://developers.google.com/maps/documentation/javascript/places-ui-kit/get-started
- https://developers.google.com/maps/documentation/javascript/places-ui-kit/place-search
- https://developers.google.com/maps/billing-and-pricing/pricing
- https://foursquare.com/pricing/

## Próximas etapas
V01–V05: conservadas. V06: código incorporado con dependencias y pruebas pendientes. V07: descarga automática de mapas offline vinculada al corredor seleccionado (verificar licencia y límites del proveedor). V08: historial y progreso. V09: transporte público. V10: funciones sociales. V11: integración iOS. V12: IA.
