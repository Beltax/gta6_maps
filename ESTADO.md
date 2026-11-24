# VICE MAPS | Registro acumulativo V12
Fecha: 24 de noviembre de 2026. Estado de código, no certificación de funcionamiento en dispositivo.

| Apartado | Incorporado en V01–V09 | Pendiente o limitado |
|---|---|---|
| A. Cartografía | Mapa vectorial, perspectiva, zoom, rotación, edificios 3D, nombres, agua, espacios verdes, brújula, temas día/atardecer/noche, controles de edificios y etiquetas. | Relieve, satélite, medición, interiores, pisos, calidad del aire, alertas meteorológicas, fotorrealismo; transición solar gradual. |
| B. GPS | Posición en vivo; navegación activa giro a giro; voz en español si disponible; próximo giro y calle; distancia y tiempo restante, ETA sin tráfico; velocímetro, cámara adaptativa, orientación por sensor o desplazamiento; ajuste aproximado a la ruta; detección de desvío con tres lecturas precisas; recálculo online; rotondas y carriles cuando el motor los devuelve; llegada, listado de giros, silencio, recentrado y salida. | Pruebas de conducción y voz iPhone; ajuste profesional a red vial, velocidad máxima, exceso de velocidad, iconos alternativos de vehículo, música, puntos de referencia, segundo plano y pantalla bloqueada. |
| C. Rutas | Auto, bici y a pie vía OSRM; origen independiente por búsqueda, coordenadas, guardado o centro; hasta ocho paradas ordenables, editables y eliminables, inversión, itinerarios guardados y compartidos; recálculo conserva las paradas pendientes. TomTom opcional: moto (beta), preferencias de peajes/autopistas/ferris/caminos sin pavimentar, más corta y eco, predicción por horario con paradas. Alternativas simples con comparación temporal cuando el motor las devuelve. | Moto y preferencias requieren clave autorizada; las restricciones son preferencias y no garantías. Alternativas para multiparada, optimización automática del orden, accesibilidad, combustible, tarifas, llegada objetivo y validación real pendientes. |
| D. Búsqueda | Photon por texto, sugerencias con pausa, sesgo geográfico, historial local, selección de puntos por pulsación larga. V06: exploración categórica Overpass, radio GPS/centro, área visible, filtros locales y fichas enriquecidas por ID OSM. | Coordenadas escritas en el buscador principal (ya disponibles en el editor de recorrido), geocodificación inversa, voz, fotos, IA, mejoras de precisión. |
| E. Lugares | 36 categorías con SVG propios, marcadores y fichas OSM; búsqueda por radio/área, nombre, accesibilidad, horario interpretable, orden por distancia/nombre; teléfono, web, dirección, horarios, datos hoteleros, cocina, reservas/menú y otros campos cuando existen. Fotos Commons bajo demanda con licencia comprobable. Enlaces a OSM y Google Maps; componente oficial Google Places UI Kit opcional para consultar valoraciones. | Datos dependen de cobertura OSM; horarios estimados o desconocidos según reglas y zona; fotos solo si existe referencia y licencia. Google UI Kit requiere clave y facturación, no probado con credenciales; no se copian reseñas o puntuaciones en el mapa. Precios actuales, concurrencia, espera, pedidos integrados y reseñas completas pendientes. |
| F. Transporte público | V09: paradas OSM por radio, líneas asociadas y geometrías, acceso a pie mediante motor existente; importación GTFS convertida local, próximas salidas y frecuencias, planificación directa o una combinación en la misma parada; lector opcional de vehículos y alertas GTFS-RT JSON. | Sin feed argentino vigente preinstalado; datos OSM variables, importación manual, horarios programados no en vivo, esquema entre paradas, límites de combinaciones y frecuencias, sin estimación de arribos en vivo ni tarifas, sin navegación multimodal giro a giro. |
| G. Tráfico | Adaptador TomTom: capas de congestión e incidentes, rutas optimizadas y predicción histórica, estimación de demora, revisión opcional cada 3 min para ruta rápida sin paradas y oferta de alternativa si ahorra ≥2 min y ≥12% frente al ETA restante previo. | Requiere clave, cobertura, condiciones y cuota; pruebas con tráfico real pendientes; revisión periódica con paradas y criterios eco/corta, fichas detalladas de incidentes, velocidad por segmento, reportes y actualización exacta del ETA de la misma ruta pendientes. |
| H. Guardados | Favoritos, Casa, Trabajo, Quiero visitar; recientes; eliminar lugares y recientes. | Listas personalizadas, notas, estacionamiento, guardar geometrías de múltiples rutas (ya se guardan itinerarios de puntos), exportación, sincronización, colaboración. |
| I. Offline | Ruta OSRM persistida; TomTom en memoria de sesión; progreso y maniobras con GPS disponible; shell y recursos del mapa visualizados cacheados; descarga automática de corredor OSRM con intermediario configurado, progreso, cancelación y gestión de almacenamiento. | Configuración y prueba del proxy; cobertura limitada a recursos descargados, posible eliminación por iOS, validación real de arranque y voz offline; sin recálculo offline ni descarga TomTom. |
| J. Street View | Descartado por usuario. | No se desarrollará Street View, panorámicas ni realidad aumentada. |
| K. Historial | Recientes de búsqueda. V08: registro GPS local voluntario durante navegación y exploración manual, historial de viajes, calendario, filtros día/mes/año, estadísticas estimadas, llegadas a destinos/paradas, trazas y zonas, exportación GPX/JSON, borrado e incógnito. | Segundo plano, clasificación automática del medio, detección de visitas no planificadas, sincronización y validación GPS/Safari reales. |
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
V01–V05: conservadas. V06: código incorporado con dependencias y pruebas pendientes. V07: desarrollada, descarga condicionada al intermediario y validación real. V08: historial y progreso incorporados al código. V09: transporte público. V10: funciones sociales. V11: integración iOS. V12: IA.


## V07 — Mapas offline (24/11/2026)
- 🟢 Caché del shell PWA V07 y caché acotada de recursos OpenFreeMap efectivamente visualizados (200 entradas, máximo 2 MiB por entrada). No se interceptan Google, TomTom, Photon ni OSRM.
- 🟢 Planificador de corredor multizoom, margen de una tesela, deduplicación, antimeridiano, validación de plantilla y huella de ruta OSRM.
- 🟡 Descarga automática tras cálculo/selección manual OSRM, previa configuración y consentimiento persistente. El proxy privado incluido debe desplegarse y comprobarse. No hay descarga masiva directa desde la PWA ni descargas sucesivas automáticas. Un paquete, 1.000 teselas, 40 MiB y una solicitud a la vez; se indica descarga parcial.
- 🟡 Arranque sin Internet si el shell y motor MapLibre siguen almacenados; se conserva TileJSON y fuentes básicas para reconstruir el estilo, ruta OSRM guardada y GPS en primer plano. Sin metadatos disponibles se intenta iniciar con fondo y ruta sin cartografía. Sin garantía de disponibilidad del mapa por expulsión de caché, CORS, versiones de datos o faltantes.
- 🟢 Progreso, cancelación, comprobación de recursos, eliminación, actualización manual y estimación del espacio. Los mapas nuevos reemplazan el paquete anterior.
- 🟡 Navegación offline: conserva instrucciones, GPS y progreso según señal y permisos; desviación sin recálculo, sin tráfico actualizado, voz solo si está disponible localmente. Se conserva la limitación de TomTom a memoria de sesión, sin paquete de corredor.
- ⚪ Pendientes: recálculo offline real, paquetes múltiples, descarga de corredores TomTom bajo licencia compatible, todas las fuentes Unicode, garantía de almacenamiento persistente, navegación con pantalla bloqueada, prueba real de Safari, proxy y teselas.
- A–H y J–N conservan el estado V06; I se amplía con las funciones anteriores. J permanece descartado. V08 próxima etapa: historial y progreso.
- Pruebas: sintaxis JS, referencias y manifiesto; ocho suites Node (seis previas, planificador/proxy y service worker con respuestas simuladas). Chromium bloqueado por ERR_BLOCKED_BY_ADMINISTRATOR; no se comprobó WebGL, conexión a proveedores, despliegue del proxy ni iPhone.

### Fuentes V07
- https://openfreemap.org/tos/ (24/11/2026: 3.000 teselas, 50 MB, cuatro solicitudes simultáneas, User-Agent identificable, tramos separados iniciados por el usuario)
- https://openfreemap.org/quick_start/
- https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_request_header
- https://operations.osmfoundation.org/policies/tiles/
- https://operations.osmfoundation.org/policies/vector/
- https://developers.cloudflare.com/workers/platform/limits/
- https://webkit.org/blog/14403/updates-to-storage-policy/


## V08 — Historial, cronología y progreso (24/11/2026)
- 🟢 Nueva pestaña PROGRESO: panel con métricas, barras de distancia por modalidad, calendario mensual con contador de viajes, filtros total/día/mes/año y lista de viajes/lugares alcanzados.
- 🟢 Registro voluntario (desactivado inicialmente). Al habilitarlo, navegación iniciada registra muestras GPS reales, incluso sin conexión si llegan posiciones. Exploración libre manual con GPS; elegir previamente modalidad en la interfaz de rutas. No registra al explorar pasivamente el mapa.
- 🟢 Distancia aproximada por GPS, tiempo observado y tiempo en movimiento. Se descartan muestras imprecisas (>50 m), desactualizadas y repetidas; saltos anómalos y huecos de más de 60 s separan segmentos. No se reconstruyen huecos. Estadísticas por fecha de inicio local, no reparto de kilómetros entre días cuando se cruza medianoche. No son odómetro ni tiempo exacto de conducción.
- 🟢 Estados llegada confirmada (navegador), finalización manual, interrupción al perder GPS en exploración o recuperar sesión. Registro de paradas alcanzadas y destino final, no visitas espontáneas. La modalidad es la elegida, no inferida.
- 🟢 Capa celeste independiente de ruta rosa: traza GPS y cuadrícula de 0,01° con muestras registradas; no equivale a superficie recorrida.
- 🟢 Exportación individual o por período GPX (segmentos discontinuos) y JSON (incluye métricas, llegadas y coordenadas); confirmación de privacidad. Borrado individual y total.
- 🟢 Incógnito: pausa nuevas grabaciones y búsquedas recientes; descarta el viaje activo previa confirmación, conserva los anteriores; borra caché de consultas Photon de la sesión. No borra ni bloquea datos operativos de navegación, favoritos, itinerarios o mapas ni consultas de proveedores. No es anonimato. Controles en PROGRESO y HUD de navegación.
- 🟡 Almacenamiento local acotado: máximo 60 viajes, 800 muestras por viaje y 30.000 muestras en total; conservación de los más recientes. Tramos largos pueden tener traza parcial, aunque siguen acumulando métricas. Guardado periódico de hasta 15 s y al cerrar/ocultar cuando se recibe el evento. El navegador puede liberar datos, la cuota puede fallar y el cierre abrupto puede perder últimas muestras. Uso recomendado en una sola pestaña; no hay sincronización ni cifrado adicional.
- 🟡 GPS activo/visible solamente. No se garantiza registro con pantalla bloqueada, app suspendida, ni cuando no llegan lecturas. No se guarda geometría de ruta de TomTom u otro motor como historial, solo muestras GPS propias y destinos seleccionados.
- 🟢 Módulos history-core.js e history.js; CSS del panel; actualización de privacidad, shell vice-shell-v8 y referencias HTML. Se conservan iconos originales y módulos de V07.
- 🟢 Diez suites Node (ocho heredadas y dos nuevas): pruebas de GPS sintético, distancia/tiempo, saltos, huecos, filtros, zonas, GPX, límites, ciclo de viaje, opt-in, incógnito y error de almacenamiento.
- 🟡 Prueba de navegador con fixtures intentada: ERR_BLOCKED_BY_ADMINISTRATOR en la navegación a vice.example.test. No verificado visualmente, en Safari/iPhone, con GPS físico ni contra proveedores.
- ⚪ Pendientes: registro fiable en segundo plano, detección automática de medio y visitas, sincronización entre dispositivos, respaldo/importación de historial y estadísticas geográficas avanzadas.
- V09: transporte público, GTFS y cobertura prioritaria argentina.


## V09 — Transporte público
- 🟢 Pestaña TRANS. y acceso desde destino; radio 500 m/1/2/5 km alrededor GPS o centro de mapa. Paradas de colectivos, estaciones ferroviarias, subte, tranvía y ferris donde OSM las registra. Marcadores SVG reutilizan iconografía original. Fichas de operador/referencia/accesibilidad si hay etiquetas. Enlaces a OSM y Cuándo SUBO.
- 🟡 Overpass: relaciones de ruta vinculadas a parada/área de parada; consulta bajo demanda, máximo 60 relaciones; geometría de vías en celeste. Puede ser incompleta o desactualizada. No confirma servicio ni dirección efectiva. Límites de 250 paradas y pausa de 2,5 s entre consultas. Sin autorefresco masivo.
- 🟢 Acceso a pie: selecciona parada como destino y perfil A PIE para calcular con motor existente, sin alterar preferencias persistentes. No es guía multimodal integral.
- 🟡 GTFS Schedule: convertidor Python estándar de ZIP a JSON, importación local IndexedDB, máximo 25 MiB, 30.000 paradas, 60.000 viajes, 800.000 horarios; un feed a la vez. Calendario semanal, excepciones y horarios posteriores a medianoche; zona horaria de agencia. Feeds con múltiples zonas horarias no admitidos. Viajes con horarios faltantes/invalidos se omiten, sin interpolación. Horarios fijos y frecuencias exact_times=1; frecuencias no exactas muestran intervalos programados, no arribos inventados.
- 🟡 Planificador: origen y destino GPS, centro, coordenadas, guardados o Photon; fecha/hora, radio 1,2 km, hasta 30 paradas cercanas por extremo, ventana 4 horas, hasta 5 opciones directas o una combinación en la misma parada, tiempo de transferencia mínimo 5 min o regla genérica superior. Si hay reglas complejas, se desactivan combinaciones. No es un motor global óptimo; no combina paradas distintas ni servicios de frecuencia no exacta. Acceso/egreso aproximado por distancia recta a 1,1 m/s; trazado discontinuo entre paradas GTFS, no geometría de calles. Horarios de agencias en zonas con horario de verano requieren validación adicional.
- 🟡 GTFS-Realtime: lector de endpoint HTTPS autorizado con CORS, JSON protobuf-mapped (no binario). Sin URL predeterminada ni claves; consulta manual, hasta 200 marcadores y 30 alertas, validación de marca temporal y expiración a 120 s, sin actualización automática, sin TripUpdates/arribos ni prueba con un feed real. Se descartan datos vencidos. Sin garantía de cobertura.
- ⚪ Tarifas, pasajes, ocupación, bicicletas públicas, navegación multimodal continua, datos en vivo argentinos por defecto, cancelaciones por viaje, recálculo y optimización completos pendientes.
- 🟢 Pruebas: 11 suites Node (10 heredadas + transit.test.cjs) y 1 prueba Python de conversión ZIP con fixture; sintaxis JS/Python, referencias HTML, manifiesto, SW v9 e integridad ZIP. Prueba Chromium intentada, ERR_BLOCKED_BY_ADMINISTRATOR. No se verificaron servicios reales, Safari/iPhone, geometría real ni feeds argentinos. Sin simulación presentada como real.

### Fuentes V09 (24/11/2026)
- https://gtfs.org/documentation/schedule/reference/ — formato, calendario, excepciones, horas >24 y frecuencias.
- https://data.buenosaires.gob.ar/es/dataset/api-transporte-publico — portal avisa suspensión de publicaciones API y GTFS.
- https://data.buenosaires.gob.ar/es/dataset/colectivos-gtfs — catálogo oficial, aviso de suspensión.
- https://buenosaires.gob.ar/movilidad-e-infraestructura/movilidad/api-transporte — programa oficial, disponibilidad efectiva no comprobada.
- https://datos.transporte.gob.ar/ — catálogo nacional.
- https://www.argentina.gob.ar/sube/cuandosubo — consulta externa oficial; no se extraen sus datos.

## V10 — Funciones sociales (24/11/2026)

Se mantiene el código V01–V09. V10 incorpora el módulo SOCIAL con enlaces estáticos y una infraestructura opcional para sesiones temporales de ubicación en vivo, sin servidor preconfigurado.

| Función | Estado de código |
|---|---|
| Compartir destino y coordenadas GPS puntuales, menú nativo, copiar, WhatsApp | Incorporada; requiere navegador compatible para hoja nativa, GPS fresco para ubicación |
| Compartir e importar itinerarios (puntos, modo, máximo 8 paradas) | Incorporada; no se comparte geometría, restricciones avanzadas ni tiempos de proveedores |
| Compartir copia de hasta 20 guardados e importar favoritos | Incorporada; no es una lista colaborativa sincronizada |
| Página de recepción sin instalar la app | Incorporada |
| Sesión temporal de ubicación en vivo, marcador de una persona, lectura cada 10 s y publicación cada 15 s como máximo | Condicionada a Worker/D1, GPS, conexión, permisos y aplicación visible |
| Cifrado cliente AES-GCM, tokens separados, vencimiento 15/30/60/120 min, revocación, ocultar datos de más de 45 s | Incorporados al código y probados localmente; sin auditoría ni despliegue real |
| Aviso manual de llegada, estado final de llegada en sesión activa | Incorporado/condicionado; sin push automático ni entrega garantizada |
| Modo incógnito detiene compartir en vivo y bloquea nuevos enlaces desde el módulo | Incorporado; no revoca enlaces estáticos ya enviados |
| Corregir mapa OpenStreetMap | Conservado de versiones anteriores mediante enlace externo |
| Amigos con cuenta y permisos individuales, listas colaborativas, chat, compartir progreso con ETA, fotos/comentarios, agregar establecimientos desde la app, sincronización y push | Pendiente |
| Segundo plano, pantalla bloqueada, actualizaciones sin Internet | No garantizado por PWA; no se simula |

**Pruebas V10:** 13 suites Node.js (11 previas + 2 sociales), Python GTFS, sintaxis JS, HTML/manifest y ZIP. El Worker se probó con Web Crypto y SQLite en memoria. Sin D1 real, navegador real o Safari/iPhone. Chromium bloqueado por administrador. No existe un servicio social activo hasta desplegarlo.

**Estado acumulado A–N:** A cartografía avanzada; B GPS avanzado; C planificación avanzada; D búsqueda avanzada; E establecimientos avanzado; F transporte parcial con GTFS opcional; G tráfico TomTom opcional; H guardados parcial, copia de listas compartible; I offline parcial; J descartado; K historial avanzado local; L social ampliado V10 y condicionado; M PWA parcial; N IA pendiente. V01–V10 con código desarrollado, V11 integraciones iOS y V12 IA pendientes. El avance por etapas no equivale a completitud de funciones.

## V11 — Integraciones avanzadas con iPhone (24/11/2026)

PWA principal conservada. Nuevos módulos ios-core.js e ios.js; panel IPHONE / INTEGRACIONES en Ajustes y navegación activa.

| Prestación | Estado V11 |
|---|---|
| Diagnóstico de APIs, permisos, almacenamiento y modo instalado | Incorporada; datos locales, no prueba real de funcionamiento |
| Bloqueo de pantalla configurable y recuperación al volver visible | Incorporada; condicionada a Wake Lock y estado del SO |
| Ahorro gráfico, movimiento reducido, cámara menos frecuente | Incorporada; ahorro de batería no medido |
| Notificación local de prueba y llegada | Condicionada a permisos, app instalada y soporte del navegador; no Web Push remoto |
| Insignia de llegada y limpieza manual | Condicionada a Badging API y permiso |
| Solicitud de persistencia, comprobación de actualizaciones | Condicionada a navegador y conectividad |
| Accesos por URL a módulos, Casa/Trabajo, manifiesto y Atajos/Siri | Incorporados; Siri requiere configurar manualmente, puede abrir Safari |
| Traspaso a Apple Maps | Incorporado, destino final únicamente; no ruta propia de Vice Maps en CarPlay |
| Exportación de evento .ics | Incorporada; importación depende de cliente de calendario, no EventKit |
| Voz española y Bluetooth | Voz conservada, prueba manual añadida; salida de audio controlada por iOS |
| GPS en segundo plano, bloqueo, WidgetKit, Dynamic Island, Watch, CarPlay propio, App Intents, contactos/calendario directo | Pendientes de desarrollo nativo y validación de capacidades; sin simulación |

**Verificación:** 15 suites Node.js (13 anteriores y 2 nuevas), convertidor GTFS Python, sintaxis de JS y referencias/manifest/ZIP. Prueba Chromium bloqueada por ERR_BLOCKED_BY_ADMINISTRATOR; sin Safari, hardware GPS, notificaciones reales, Apple Maps, Siri, calendario ni Bluetooth comprobados. No se compiló app nativa.

**Estado A–N:** A cartografía avanzada; B GPS avanzado; C rutas avanzado; D búsqueda avanzada; E establecimientos avanzado; F GTFS opcional; G TomTom opcional; H guardados parcial; I offline condicionado; J descartado; K historial local avanzado; L social condicionado; M ampliado V11 (PWA); N IA pendiente. V01–V11 con código, V12 siguiente; avance por etapas, no porcentaje de funcionalidades finalizadas.


## V12 — VICE AI / asistente de navegación (24/11/2026)

| Prestación | Estado V12 |
|---|---|
| Asistente en español con intenciones y confirmaciones | Incorporada: motor determinista por reglas, no modelo generativo; no guarda conversaciones propias |
| Búsqueda de categorías OSM con filtros de apertura, accesibilidad, radio, nombre entre comillas, cocina/dieta e internet | Incorporada, condicionada a cobertura y etiquetas; no interpreta cualquier frase |
| Búsqueda cerca de GPS, centro y área visible | Incorporada; ubicación nombrada no se resuelve automáticamente |
| Búsqueda de lugares junto a ruta OSRM | Incorporada; primer tramo de hasta 10 km o 120 vértices, radio 500/1000 m; distancia geométrica, no desvío vial; solo datos OSRM |
| Optimización del orden de 2–8 paradas | Incorporada con matriz de tiempos OSRM y búsqueda exacta de permutaciones; extremos fijos; sin tráfico, tiempos de estancia ni restricciones; confirmación antes de aplicar |
| Comparación de tres horarios futuros | Condicionada a TomTom habilitado y cuota; intervalo de 30 min, compara duración estimada, no garantiza mejor hora del día |
| Dictado opcional y lectura de resumen de navegación | Condicionada al navegador, permisos y voz; dictado desactivado en incógnito y navegación activa; audio puede enviarse al proveedor de reconocimiento |
| Resumen de ficha y progreso | Incorporada: campos publicados y datos del panel existente; progreso requiere GPS reciente y preciso |
| Acceso a Casa, Trabajo, historial y transporte | Incorporada; selección confirmada, no inicia navegación; transporte conserva límites GTFS |
| Valoraciones, precios, concurrencia | No se clasifican ni inventan; se declaran filtros no comprobables; consulta individual Google opcional de V06 |
| Modelo de lenguaje generativo, visión, reconocimiento de lugares con cámara, preferencias aprendidas, conversación libre, planificación multimodal por IA | Pendientes. Se investigó WebLLM; requiere WebGPU, pesos y validación móvil; no se incorporó. |

**Pruebas:** 17 suites Node.js (15 anteriores + 2 nuevas) y convertidor GTFS Python; sintaxis, referencias, caché y manifiesto. Las pruebas del asistente utilizan matrices y respuestas sintéticas; no se verificó el endpoint OSRM Table ni Overpass/TomTom en vivo. Chromium bloqueado por ERR_BLOCKED_BY_ADMINISTRATOR; no se probó Safari, dictado, voz ni GPS real.

**Estado A–N:** A cartografía avanzada; B GPS avanzado; C rutas ampliado con optimización OSRM; D buscador ampliado por reglas; E establecimientos ampliado con filtros; F GTFS opcional; G TomTom opcional; H guardados parcial; I offline condicionado; J descartado; K historial local avanzado; L social condicionado; M PWA iPhone avanzado/condicionado; N asistente por reglas incorporado parcialmente. V01–V12 con código desarrollado: 12/12 etapas del plan inicial, no 100% de las funcionalidades.

**Siguiente fase propuesta:** V13 consolidación, pruebas reales en iPhone, configuración de servicios opcionales, corrección de regresiones y revisión de fidelidad gráfica.
