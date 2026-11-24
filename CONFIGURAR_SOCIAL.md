# VICE MAPS V10 — Compartir y ubicación en vivo

## 1. Compartir sin servidor

Actualizá GitHub Pages con todo el ZIP V10. En SOCIAL podés compartir el destino, tu última posición GPS válida (activá GPS primero), un itinerario de hasta ocho paradas o una copia de hasta 20 lugares guardados. El botón COMPARTIR de la ficha y el editor de recorridos también abren estos enlaces. Podés usar la hoja nativa de iOS, copiar o abrir WhatsApp; no se envían mensajes automáticamente. En itinerarios se comparten puntos y modalidad, no geometría, tiempos, preferencias avanzadas ni datos TomTom. Revisá las restricciones antes de recalcular.

El destinatario abre `compartir.html` con el enlace recibido, sin cuenta ni instalación. Puede consultar las coordenadas o abrir Vice Maps y cargar los puntos, recalcular el itinerario o importar una copia de la lista a favoritos. Los enlaces estáticos contienen los datos en el fragmento de la URL: no son cifrados ni revocables, y pueden reenviarse. No compartas ubicaciones privadas en público. Un aviso manual de llegada se ofrece luego de una llegada GPS confirmada en la navegación; no es una notificación automática.

## 2. Ubicación en vivo (opcional, requiere despliegue)

El servicio no está desplegado ni preconfigurado. No es necesario para las funciones anteriores. Se utiliza un Cloudflare Worker separado del proxy de mapas offline, con una base D1. Cloudflare ofrece un plan gratuito con límites; conservá la cuenta en Free y revisá condiciones vigentes. No hay garantía de disponibilidad ni gratuidad futura.

Referencias oficiales:
- https://developers.cloudflare.com/workers/platform/pricing/
- https://developers.cloudflare.com/d1/reference/faq/
- https://developers.cloudflare.com/d1/worker-api/d1-database/
- https://developers.cloudflare.com/workers/configuration/cron-triggers/

### Preparar tu Worker

1. Creá una cuenta Cloudflare (plan Free) e instalá Node.js LTS en tu computadora. Guardá una copia del proyecto local y abrí una terminal dentro de `social-server/`.
2. Ejecutá `npx wrangler login` y luego `npx wrangler d1 create vice-social`. Copiá el `database_id` que devuelve Cloudflare. Si ya existe, utilizá la base existente; preferí una base exclusiva para este módulo.
3. En `wrangler.toml`, sustituí `REEMPLAZAR` de `database_id` por el ID devuelto. En `APP_ORIGIN`, ingresá únicamente el origen HTTPS de tu GitHub Pages, por ejemplo `https://miusuario.github.io`, sin ruta, sin barra final. Si usás un dominio propio, colocá su origen exacto. Todos los destinatarios deben abrir la página publicada desde ese mismo origen.
4. Ejecutá `npx wrangler d1 execute vice-social --remote --file=./schema.sql` (crea la tabla y su índice de vencimiento). Verificá que el comando finalice correctamente.
5. Ejecutá `npx wrangler deploy`. Generá una clave aleatoria privada de 32 bytes en base64url con `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"`. Debe tener 43 caracteres. Guardala en tu gestor de contraseñas. Configurala con `npx wrangler secret put PUBLISHER_SECRET`, pegándola cuando lo solicite la terminal. NO la agregues al repositorio, HTML, captura ni mensaje. El servicio no admite crear sesiones hasta tener este secreto.
6. Copiá la URL raíz HTTPS que devuelve el despliegue, normalmente `https://vice-maps-social.<subdominio>.workers.dev`. Revisá la vinculación D1, las variables y el Cron Trigger de limpieza cada 15 minutos en el panel del Worker. No habilites logs de cuerpos o tokens. Si el nombre del Worker ya está ocupado, cambialo en el TOML antes de desplegar.

### Iniciar una sesión desde iPhone

1. Abrí Vice Maps por HTTPS, activá GPS y esperá una posición reciente. Entrá en SOCIAL > COMPARTIR UBICACIÓN EN VIVO.
2. Ingresá la URL raíz del Worker y la clave privada de publicación, elegí 15, 30, 60 o 120 minutos y confirmá. La clave de publicación no se guarda en el navegador. La sesión solo se inicia con GPS reciente, Internet, app visible e incógnito desactivado.
3. Tocá COMPARTIR ENLACE TEMPORAL. Enviá el enlace únicamente a una persona de confianza. No envíes la clave de publicación. Cualquier receptor del enlace puede ver la sesión hasta que venza o se revoque; no hay cuentas de amigos ni verificación de identidad.
4. El receptor abre el enlace y toca CONSULTAR UBICACIÓN para ver una posición reciente; también puede elegir VER EN VICE MAPS y confirmar la visualización en el mapa. Puede cerrar la consulta sin afectar al emisor. El mapa consulta teselas a proveedores externos; la página de recepción no carga cartografía ni scripts de terceros hasta que el usuario elija abrir otro mapa.
5. Para terminar, desde SOCIAL (también accesible en navegación activa) tocá DETENER Y REVOCAR ACCESO. Si no hay Internet, la app deja de enviar inmediatamente pero no puede confirmar la revocación; reintentá al reconectar. La lectura antigua se oculta tras 45 s y la sesión vence en el servidor. Si se recarga la app, no reinicia el seguimiento: intenta revocar la sesión anterior usando un token guardado en sessionStorage, mientras esté disponible. Al cerrar la pestaña definitivamente puede perderse dicho token; el vencimiento sigue aplicándose.

## 3. Comportamiento y seguridad

- La app publica como máximo una vez cada 15 segundos cuando está visible, online y con GPS de hasta 30 s de antigüedad y precisión de hasta 100 m. La consulta del receptor ocurre cada 10 segundos. No se garantiza latencia ni continuidad en iOS suspendido o con pantalla bloqueada.
- Se usa AES-GCM de 256 bits en Web Crypto con IV aleatorio por mensaje y el identificador como dato autenticado. La clave de descifrado está en el fragmento del enlace y no se manda al Worker. El servidor guarda solo el último paquete cifrado, hashes de tokens y metadatos de sesión. No guarda una traza de ubicaciones. La infraestructura puede conservar registros operativos o copias de seguridad conforme a sus políticas. La página principal depende de bibliotecas externas y el código no ha sido auditado independientemente; no es una garantía de seguridad absoluta.
- El token de lectura no permite actualizar ni eliminar una sesión. El token de escritura no permite leerla. El secreto de publicación solo permite crear nuevas sesiones; protegelo. El Worker limita el origen CORS, exige token para leer/actualizar/borrar, restringe tamaño de solicitudes y frecuencia de escrituras. No es un servicio público multiusuario con protección avanzada contra abuso.
- La sesión expira en servidor y el cron intenta eliminar registros vencidos. Un receptor no obtiene datos después de caducidad, aunque el borrado físico pueda demorarse. La revocación impide futuras lecturas; no borra información ya vista, copiada o guardada por el receptor.
- Incógnito impide iniciar o ver sesiones nuevas en la app y detiene/revoca la activa cuando es posible. No vuelve anónimas las consultas a proveedores. Los enlaces ya compartidos fuera de la app no se eliminan ni se pueden retirar de otras aplicaciones.
- Al confirmar una llegada durante navegación, una sesión activa intenta publicar una última posición con estado de llegada, si el GPS sigue fresco y hay conexión. No se envían SMS, WhatsApp ni push automáticamente. Este estado es temporal, no un sistema de notificación garantizada.

## 4. Comprobaciones antes de usar

Probá con dos dispositivos estando estacionado. Compartí primero un destino; abrí el enlace, revisá coordenadas e importación. Luego configurá el Worker, iniciá una sesión breve de 15 minutos, abrí el enlace en el segundo dispositivo y verificá actualización, precisión, pérdida de señal, vencimiento y revocación. Activá incógnito y verificá que se detenga. No uses este prototipo para emergencias, seguimiento de menores, seguridad personal ni navegación exclusiva. No compartas ubicación de otra persona sin su consentimiento.

## 5. Estado de pruebas

Pruebas locales con Node 22 (incluye SQLite experimental), Web Crypto real y SQL ejecutado en SQLite en memoria, no Cloudflare D1 desplegado. Las llamadas al Worker fueron invocaciones locales. Chromium quedó bloqueado por ERR_BLOCKED_BY_ADMINISTRATOR. No se probó la comunicación en producción, Safari ni GPS físico. Los enlaces estáticos y el módulo en vivo están desarrollados en código; no se certifica su funcionamiento real hasta realizar las pruebas anteriores.
