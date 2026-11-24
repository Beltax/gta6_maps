# VICE MAPS V11 — Integraciones iPhone

## Instalación gratuita y actualización
Subí los archivos de la raíz del ZIP a GitHub Pages en el mismo repositorio de V10; conservá el mismo origen y ruta para no perder datos. Abrí la URL HTTPS en Safari, Compartir → Agregar a pantalla de inicio (en versiones que lo muestran, activá Abrir como app web). Si ya la instalaste, cerrala y reabrila con Internet; revisá que diga V.11. No borres datos del sitio si querés mantener guardados e historial. En Ajustes → IPHONE / INTEGRACIONES se puede solicitar una comprobación de actualizaciones. No la hagas durante navegación.

## Controles V11
- Mantener pantalla encendida: activado de forma predeterminada solo mientras la navegación esté activa y la página visible. El SO puede denegarlo o liberar el bloqueo. Se intenta recuperar al volver a la app; no evita suspensión o bloqueo forzado. Podés desactivarlo para reducir consumo.
- Ahorro gráfico: reduce la frecuencia de animación de cámara durante navegación (700 a 1600 ms entre actualizaciones), elimina la transición de cámara en navegación, oculta extrusiones 3D y resplandor de ruta y usa 2D. También respeta la preferencia de movimiento reducido al aplicarse la configuración. No modifica el GPS, instrucciones ni frecuencia de consultas de tráfico. No se ha medido el ahorro en batería. Desactivá el ajuste y, si corresponde, Movimiento reducido en iOS para recuperar 3D.
- Avisos e insignia de llegada: desactivados inicialmente. Desde IPHONE / INTEGRACIONES, tocá PERMITIR Y PROBAR NOTIFICACIONES. En iOS las notificaciones web requieren la app agregada a pantalla de inicio y un sistema compatible (desde iOS 16.4 para Web Push); conceder permiso no garantiza que `showNotification` funcione en tu dispositivo. Habilitá Avisos de llegada e Insignia si lo deseás. Se solicita un aviso genérico al detectar llegada en una navegación activa y no incógnita. La insignia es 1, no un contador de viajes. Podés borrarla. No existe un emisor Web Push ni notificaciones remotas programadas; no funciona como Live Activity ni como aviso garantizado con app cerrada.
- Voz: la prueba usa la síntesis de voz existente; activá VOZ durante navegación si la deshabilitaste. Para escuchar en el auto, conectá el iPhone por Bluetooth y elegí salida de audio desde los controles de iOS. La app no controla el dispositivo Bluetooth ni otras aplicaciones de música; probá el volumen y la interrupción de música antes de conducir. No se garantiza voz sin conexión.
- Diagnóstico: diferencia presencia de APIs, permiso y bloqueo actual; no prueba ubicación ni pide permisos automáticamente. La persistencia y cuota dependen de Safari. La solicitud de almacenamiento persistente no garantiza retención indefinida.

## Atajos y Siri (sin instalar una app nativa)
1. Desde Ajustes → IPHONE / INTEGRACIONES → ATAJOS Y SIRI, copiá la URL deseada (mapa, guardados, progreso, transporte, Casa o Trabajo).
2. Abrí Atajos en iPhone, creá uno, agregá la acción URL, pegá la URL, agregá Abrir URL y asigná un nombre, por ejemplo «Abrir Vice Maps» o «Destino casa».
3. Ejecutá el atajo manualmente primero. Luego decile a Siri su nombre. Puede abrir Safari, no necesariamente la instancia instalada. Para Casa/Trabajo necesitás haber guardado esos destinos en esa misma instancia; se solicita confirmación antes de seleccionarlos. No se inicia GPS ni navegación por un enlace. Los atajos del manifiesto son opcionales según el sistema, no widgets iOS.

## Apple Maps y Calendario
Con un destino seleccionado, Ajustes → IPHONE / INTEGRACIONES → ABRIR DESTINO EN APPLE MAPS. Confirmá el traspaso. Se envían coordenadas del destino final a Apple, que calcula una ruta propia. Auto/a pie se indican cuando corresponde; bicicleta/moto quedan a elección de Apple Maps. No transfiere origen independiente, paradas, geometría, restricciones, tráfico o ETA. No es integración CarPlay de Vice Maps; si Apple Maps está disponible en el vehículo, puede usarse por separado. Evitá cambiar de app mientras conducís.

EXPORTAR VIAJE AL CALENDARIO permite elegir fecha local de salida y duración editable, genera un .ics con destino y coordenadas, y abre la hoja para compartir archivo si está disponible; de lo contrario descarga el archivo. Guardalo en Archivos y usá un importador de calendario compatible (por ejemplo Calendario en Mac o un cliente que importe .ics). iOS puede no ofrecer importación directa desde Safari/Archivos. No escribe eventos en tu calendario ni lee contactos. Desactivado en incógnito. El evento es un plan, no una predicción de tráfico. Compartí el archivo solo con personas de confianza.

## Camino nativo, evaluado pero no desarrollado en esta versión
Apple permite instalar y probar una app propia desde Xcode con una cuenta gratuita (Personal Team). Requiere una Mac compatible, Xcode, cuenta de Apple, un iPhone y activar modo desarrollador si corresponde. El perfil de aprovisionamiento vence cada 7 días: hay que volver a aprovisionar la aplicación. No es una instalación permanente ni una publicación en App Store. En Windows no se puede compilar con Xcode directamente. No se incluye IPA ni proyecto nativo probado.

| Prestación | Vía nativa futura |
|---|---|
| GPS con pantalla bloqueada / segundo plano | Core Location, modos de ejecución de ubicación, autorización explícita y ciclo de navegación; requiere prueba en dispositivo. |
| Widgets y Dynamic Island | WidgetKit + ActivityKit y extensión de widget; disponibilidad de hardware y firma/capacidades por confirmar. |
| Siri integrada | App Intents, a diferencia del atajo manual de esta PWA. |
| CarPlay navegación propia | CarPlay framework, entitlement específico solicitado a Apple; no garantizado con cuenta gratuita. |
| Apple Watch | App watchOS/WatchConnectivity o Live Activities compatibles; requiere desarrollo y pruebas. |
| Contactos y calendario directo | Contacts/EventKit, con permisos mínimos. |
| Motor cartográfico nativo | MapLibre Native y migración de estilos; integrar código de navegación y caché bajo condiciones del proveedor. |

Referencias oficiales consultadas: https://developer.apple.com/help/account/basics/about-your-developer-account ; https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/ ; https://webkit.org/blog/14112/badging-for-home-screen-web-apps/ ; https://developer.apple.com/carplay/ ; https://developer.apple.com/documentation/activitykit/ ; https://support.apple.com/guide/shortcuts/run-shortcuts-with-siri-apd07c25bb38/ios ; https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API

## Prueba segura en iPhone (pendiente)
Estacionado o como acompañante: abrir PWA, consultar diagnóstico, probar aviso/insignia, activar GPS, trazar ruta corta, comenzar navegación, probar voz y salida Bluetooth, comprobar bloqueo de pantalla y vuelta a la app, cambiar ahorro gráfico, exportar .ics y probar atajo. Probar modo incógnito y que no se generen avisos de llegada. No usar como único navegador hasta comprobar funcionamiento real. Mantener V10 como respaldo.
