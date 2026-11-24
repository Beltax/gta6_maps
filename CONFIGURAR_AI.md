# VICE MAPS V12 — VICE AI

## Instalación
No necesita un servicio de IA ni una clave adicional. Sustituí los archivos de la V11 con el ZIP completo, conservando el mismo origen HTTPS para mantener tus preferencias y guardados. Cerrá y reabrí con Internet; si todavía ves V.11, utilizá Ajustes > iPhone > Buscar actualización. Conservá una copia del ZIP V11 y exportá el historial antes de probar.

## Qué interpreta
El motor local reconoce intenciones por reglas y expresiones regulares. No es ChatGPT ni un modelo de lenguaje generativo. No mantiene una conversación ni aprende hábitos. No ejecuta código ni modifica rutas al interpretar texto. Los ejemplos incorporados sirven para conocer las frases admitidas.

| Consulta | Acción |
|---|---|
| Buscá una cafetería abierta y accesible a 2 km | Consulta OSM por categoría, radio, apertura publicada y wheelchair=yes |
| Farmacias a 500 m | Radio alrededor del GPS o del centro si no hay posición |
| Restaurantes con wifi y cocina italiana | Filtra etiquetas OSM publicadas |
| Farmacia "Central" | Nombre entre comillas |
| Buscá estaciones de servicio cerca de mi recorrido | Overpass, corredor OSRM limitado |
| Organizá mis paradas para llegar más rápido | Matriz OSRM y propuesta de orden |
| ¿A qué hora me conviene salir mañana? | Comparación de tres horas futuras vía TomTom; fecha y hora editables |
| ¿Cuánto falta para llegar? | Datos del panel GPS durante navegación activa |
| Resumen del destino | Campos publicados de la ficha actual |
| Quiero ir a casa | Seleccionar un guardado Casa, previa confirmación |
| Transporte público | Acceso al módulo V09 |
| Mi progreso | Acceso al historial V08 |

La interpretación muestra los filtros aplicados. Condiciones fuera del repertorio pueden no reconocerse: revisá la vista previa y corregí la consulta. Usá una categoría por búsqueda, 500 m, 1/2/5 km, o el área visible. Para otra ciudad, desplazá el mapa y seleccioná área visible; no se geocodifica el topónimo dentro de la consulta por categoría. Las calificaciones, precios, reservas, espera y otros atributos no verificados se señalan como no comprobables; si confirmás, se buscan solo las condiciones admitidas. No se extraen estrellas de Google; la integración oficial opcional de V06 permanece disponible por ficha.

## Corredor de lugares
Calculá una ruta OSRM con Internet. El asistente consulta un prefijo de hasta 10 km o 120 vértices de geometría, con radio 500 m o 1 km; indica si la cobertura es parcial. La distancia es geométrica desde el punto hasta la polilínea, no el costo de desviarse por la calle. No busca sobre rutas TomTom para evitar transmitir su geometría a otros proveedores. Se muestran hasta 20 coincidencias en el panel y 60 en el mapa (listado cartográfico usa distancia desde el punto de referencia). El límite de la respuesta OSM es 250 elementos; no es exhaustivo. La búsqueda se hace de forma manual y con pausa mínima entre consultas. No cambia la ruta hasta seleccionar expresamente un nuevo destino.

## Orden de paradas
1. Seleccioná el destino y, desde Editar recorrido, agregá 2 a 8 paradas intermedias.
2. Usá auto, bicicleta o a pie, modo rápido básico, sin restricciones avanzadas ni TomTom activo. La matriz no garantiza respetar preferencias de peajes ni restricciones especiales.
3. Elegí Optimizar paradas / VICE AI. Confirmá la consulta de matriz OSRM Table.
4. La búsqueda de permutaciones encuentra el mínimo de tiempos entre pares de la matriz, con origen y destino fijos. Los valores nulos se tratan como tramos inaccesibles. Compará el orden original y propuesto. Aplicalo explícitamente y recalculá con el botón habitual.

No es una garantía de tiempo real ni de menor consumo. No incluye tiempos de parada, ventanas horarias ni congestión. Se rechazan propuestas vencidas si cambia el recorrido u origen; no se modifica la navegación activa. No se consulta cada permutación al servidor: una única matriz de hasta diez puntos, para uso moderado. El endpoint público puede fallar o no admitir Table en todos los perfiles; no se inventan resultados.

## Comparación de salidas
Configurá TomTom según LEEME y seleccioná un destino en auto/moto. Elegí fecha/hora local futura y confirmá. Se realizan hasta tres consultas (hora, +30, +60 min) con separación entre ellas y con preferencias/paradas actuales. Se identifica la menor duración entre respuestas válidas, no necesariamente la mejor hora de todo el día ni la llegada más temprana. Requiere cuota disponible; se muestra cuántas de tres respondieron. No se persisten las respuestas de TomTom.

## Voz y privacidad
El dictado opcional usa SpeechRecognition/webkitSpeechRecognition si el navegador lo permite. El servicio del navegador puede transmitir audio fuera del dispositivo; se informa antes de pedir permiso. El texto se muestra para revisión, no se ejecuta automáticamente. Se deshabilita en modo incógnito y navegación activa. También podés usar el teclado de iOS. El resumen de navegación se lee mediante la síntesis de voz existente si está habilitada. No se graban conversaciones del asistente ni se envían consultas a una IA generativa. Al confirmar una consulta, los proveedores de mapas reciben las coordenadas o búsquedas necesarias; la política de privacidad anterior sigue aplicándose.

## Alternativas estudiadas
- WebLLM: inferencia local por WebGPU, requiere descargar pesos y comprobar memoria y consumo del iPhone. No integrada por falta de validación de dispositivo. https://webllm.mlc.ai/docs/user/get_started.html
- API de modelo externo: no integrada; exigiría una cuenta, credenciales, verificación de cuotas y un tratamiento explícito de datos. El funcionamiento básico de Vice Maps no depende de una API de IA.
- OSRM Table: https://project-osrm.org/docs/v26.6.1/http ; uso moderado https://routing.openstreetmap.de/about.html
- Overpass polilínea: https://dev.overpass-api.de/overpass-doc/en/full_data/polygon.html
- Web Speech: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

## Pruebas y limitaciones
17 suites Node y una Python pasaron con datos de prueba. No hay validación de Safari ni de endpoints reales nuevos; Chromium bloqueado por administrador. El asistente no ofrece visión ni reconocimiento fotográfico, predicciones independientes del proveedor, recomendaciones aprendidas ni conversación generativa. El proyecto sigue siendo un prototipo, no un navegador certificado. Probá estacionado o como acompañante.
