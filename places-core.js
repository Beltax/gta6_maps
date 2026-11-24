/* V06: original vector glyphs, OSM taxonomy, conservative hours and query helpers. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.VicePlaces=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
const groups=[
['restaurant','Restaurantes','Comer y beber','amenity','restaurant','M5 3v7m3-7v7m3-7v7M5 10h6M8 10v11M18 3c-3 2-3 8 0 9h1V3h-1zm1 9v9','#bac9d5'],
['cafe','Cafeterías','Comer y beber','amenity','cafe','M4 7h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zm13 1h2a3 3 0 0 1 0 6h-2M3 21h17M9 2v3m4-3v3','#e4d4c8'],
['fast_food','Comida rápida','Comer y beber','amenity','fast_food','M3 10h18M4 7a8 5 0 0 1 16 0zM3 14h18M4 17h16v3H4z','#e5d0bf'],
['bar','Bares y pubs','Comer y beber','amenity','bar|pub|nightclub','M3 4h18l-9 10zM12 14v6m-5 0h10M7 8h10','#c4c6de'],
['ice_cream','Heladerías','Comer y beber','amenity','ice_cream','M6 10a6 6 0 1 1 12 0zM7 10l5 12 5-12','#f2d4df'],
['supermarket','Supermercados','Compras','shop','supermarket|convenience','M3 4h3l3 12h10l3-9H7M10 20h.1M18 20h.1','#c9ced8'],
['mall','Centros comerciales','Compras','shop','mall|department_store','M3 9h18l-2 12H5zM8 9l4-6 4 6M9 12v6m6-6v6','#d3d0db'],
['clothes','Ropa','Compras','shop','clothes','M8 3l4 3 4-3 6 4-3 5-3-2v11H8V10l-3 2-3-5z','#d5c9d4'],
['shoes','Calzado','Compras','shop','shoes','M3 8l5-3 4 8 5 2 4 1v4H3zM9 11l3-2m0 5 3-2','#e7c9be'],
['hairdresser','Peluquerías','Compras','shop','hairdresser|beauty','M7 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm10 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM9 9l10 12M15 9 5 21','#e9d7df'],
['bakery','Panaderías','Compras','shop','bakery','M3 14c0-7 5-10 9-10s9 3 9 10v5H3zM8 8l3 4m2-6 3 4','#e9d4ad'],
['electronics','Electrónica','Compras','shop','electronics|mobile_phone|computer','M3 4h18v13H3zM8 21h8M12 17v4','#c8cde2'],
['pharmacy','Farmacias','Salud','amenity','pharmacy','M9 3h6v6h6v6h-6v6H9v-6H3V9h6z','#f0d5d5'],
['hospital','Hospitales','Salud','amenity','hospital|clinic','M4 21V3h16v18M8 8h8m-4-4v8M9 21v-5h6v5','#f0d5d5'],
['doctor','Consultorios','Salud','amenity','doctors|dentist|veterinary','M6 3v7a6 6 0 0 0 12 0V3M3 3h6m6 0h6M12 16v2a4 4 0 0 0 8 0v-2','#e8d7d8'],
['gym','Gimnasios','Salud','leisure','fitness_centre|sports_centre','M2 9v6m4-9v12m12-12v12m4-9v6M6 12h12','#c5c4d7'],
['hotel','Hoteles','Servicios','tourism','hotel|hostel|guest_house|motel','M3 4v17M3 16h18v5M3 10h18v6M7 7h4v3','#d5c8df'],
['bank','Bancos','Servicios','amenity','bank','M2 8l10-6 10 6zM5 10v9m7-9v9m7-9v9M3 21h18','#d0d6cb'],
['atm','Cajeros','Servicios','amenity','atm','M4 3h16v18H4zM7 6h10v5H7zM8 15h8m-6 3h4','#c8d4ca'],
['police','Comisarías','Servicios','amenity','police','M12 2l9 4-2 10-7 6-7-6L3 6zM12 7v8m-4-4h8','#b8c5d7'],
['post','Correo','Servicios','amenity','post_office','M3 5h18v14H3zM3 6l9 7 9-7','#d9d2be'],
['toilets','Baños públicos','Servicios','amenity','toilets','M7 5h.1M17 5h.1M7 9v12m-4-8 4-4 4 4M17 9l-4 8h8zM17 17v4','#c9cbd7'],
['fuel','Combustible','Transporte','amenity','fuel','M3 3h12v18H3zM6 6h6v5H6zM15 12h2l2 2v4a2 2 0 0 0 3 0V8l-3-3','#c6d0d5'],
['parking','Estacionamientos','Transporte','amenity','parking','M8 21V3h6a6 6 0 0 1 0 12H8','#d1dbe7'],
['charging','Carga eléctrica','Transporte','amenity','charging_station','M7 3v6m10-6v6M4 9h16v3a8 8 0 0 1-8 8v2M12 20v-5','#c4dfcc'],
['repair','Talleres mecánicos','Transporte','shop','car_repair|motorcycle_repair','M20 3l-5 5-3-3 2-3a7 7 0 0 0-8 9L2 18l4 4 7-7a7 7 0 0 0 7-12z','#d7cdd1'],
['bus','Colectivos','Transporte','highway','bus_stop','M5 3h14v15H5zM7 6h10v7H7zM8 18v3m8-3v3M8 15h.1m8 0h.1','#c8d8d4'],
['train','Trenes y subtes','Transporte','railway','station|halt|tram_stop','M6 3h12v14H6zM8 6h8v6H8zM8 17l-3 5m11-5 3 5M9 15h.1m6 0h.1','#c9cde3'],
['airport','Aeropuertos','Transporte','aeroway','aerodrome|terminal','M12 2v20M3 15l9-7 9 7v3l-9-4-9 4zM8 22l4-3 4 3','#d5dce5'],
['port','Puertos','Transporte','amenity','ferry_terminal','M12 3v17M9 5h6M4 13c0 5 4 8 8 8s8-3 8-8M2 15l2-3 3 3m10 0 3-3 2 3','#c1cbe7'],
['cinema','Cines','Ocio y turismo','amenity','cinema|theatre','M3 8h18v13H3zM3 8l-1-5 18-2 1 5zM8 3l3 4m4-5 3 4M8 13h8','#d8c4de'],
['park','Parques y plazas','Ocio y turismo','leisure','park|garden|playground','M12 2l-7 10h4l-5 5h16l-5-5h4zM12 17v5','#c7dfc9'],
['beach','Playas','Ocio y turismo','natural','beach','M3 13a9 9 0 0 1 18 0zM12 4v16m-9 1h18','#e3d8b9'],
['tourism','Atracciones','Ocio y turismo','tourism','attraction|museum|viewpoint|gallery|zoo|theme_park','M3 9l9-6 9 6zM5 11v8m5-8v8m4-8v8m5-8v8M3 21h18','#e0d4bf'],
['sport','Deportes','Ocio y turismo','leisure','pitch|stadium|swimming_pool|golf_course','M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3v18M6 6l12 12','#c9d6cb'],
['school','Educación','Servicios','amenity','school|college|university|library','M3 8l9-5 9 5-9 5zM6 10v7l6 4 6-4v-7M21 9v8','#d5d4e5']
];
const categories=groups.map(([id,label,group,key,values,path,color])=>({id,label,group,key,values:values.split('|'),path,color}));
const byId=id=>categories.find(x=>x.id===id);const aliases={healthcare:{hospital:'hospital',clinic:'hospital',doctor:'doctor',dentist:'doctor'},public_transport:{platform:'bus',stop_position:'bus'},harbour:{yes:'port'},shop:{ice_cream:'ice_cream'}};
function category(tags={}){if(byId(tags.viceCategory))return byId(tags.viceCategory);const t={...tags};if(t.osm_key&&t.osm_value)t[t.osm_key]=t.osm_value;return categories.find(x=>x.values.includes(t[x.key]))||Object.entries(aliases).map(([k,v])=>byId(v[t[k]])).find(Boolean)||null;}
function icon(id){const c=byId(id)||{color:'#cbd2da',path:'M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7zM12 7v4'};return `<svg class="vice-glyph" aria-hidden="true" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><rect x="1.5" y="1.5" width="29" height="29" rx="5" fill="${c.color}" stroke="#292a31" stroke-width="2.6"/><g transform="translate(5 5) scale(.92)" fill="none" stroke="#282a31" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="${c.path}"/></g></svg>`;}
function validCoord(c){return Array.isArray(c)&&c.length===2&&c.every(Number.isFinite)&&Math.abs(c[0])<=180&&Math.abs(c[1])<=90;}
function query(id,area){const c=byId(id);if(!c)throw Error('Categoría inválida');let where;if(area.kind==='near'){if(!validCoord(area.center)||![500,1000,2000,5000].includes(area.radius))throw Error('Área inválida');where=`around:${area.radius},${area.center[1].toFixed(5)},${area.center[0].toFixed(5)}`;}else{const b=area.bounds;if(!Array.isArray(b)||b.length!==4||!b.every(Number.isFinite)||b[0]<-90||b[2]>90||b[1]<-180||b[3]>180||b[2]<=b[0]||b[3]<=b[1]||b[2]-b[0]>.20||b[3]-b[1]>.25)throw Error('Acercá el mapa para explorar esta zona.');where=b.map(x=>x.toFixed(5)).join(',');}let selectors=[[c.key,c.values]];if(id==='port')selectors.push(['harbour',['yes']]);if(id==='ice_cream')selectors.push(['shop',['ice_cream']]);if(id==='hospital')selectors.push(['healthcare',['hospital','clinic']]);if(id==='doctor')selectors.push(['healthcare',['doctor','dentist']]);return `[out:json][timeout:20];(${selectors.map(([k,v])=>`nwr["${k}"~"^(${v.join('|')})$"](${where});`).join('')});out center 251;`;}
function exactQuery(p){const type=({N:'node',W:'way',R:'relation',node:'node',way:'way',relation:'relation'})[p?.osm_type];const id=String(p?.osm_id??'');return type&&/^\d{1,18}$/.test(id)?`[out:json][timeout:12];${type}(${id});out tags;`:null;}
function normalize(el,id){const t=el.tags||{};const c=[el.lon??el.center?.lon,el.lat??el.center?.lat];if(!validCoord(c))return null;const cat=byId(id)||category(t);const name=t['name:es']||t.name||t.brand||t.operator||cat?.label||'Lugar sin nombre';return {c,name,info:{...t,osm_type:el.type,osm_id:el.id,viceCategory:cat?.id,viceSource:'OpenStreetMap',viceUnnamed:!(t.name||t['name:es']||t.brand||t.operator)}};}
function address(p){return [[p['addr:street']||p.street,p['addr:housenumber']||p.housenumber].filter(Boolean).join(' '),p['addr:city']||p.city||p['addr:place'],p.state,p.country].filter(Boolean).join(', ');}
function safeURL(x){try{const u=new URL(x);return ['http:','https:'].includes(u.protocol)?u.href:null;}catch{return null;}}
const days=['Su','Mo','Tu','We','Th','Fr','Sa'];
function opening(raw,now=new Date(),zone=null){if(!raw)return {state:'unknown',label:'Sin horario publicado'};if(raw.trim()==='24/7')return {state:'open',label:'Abierto 24 h · horario publicado'};if(!zone)return {state:'unknown',label:'Horario publicado · zona horaria no confirmada'};let parts;try{parts=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:zone,weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now).map(x=>[x.type,x.value]));}catch{return {state:'unknown',label:'Zona horaria inválida'};}const today=days.indexOf(parts.weekday.slice(0,2)),min=+parts.hour*60+ +parts.minute;let open=false;const usedDays=new Set();for(const rule of raw.split(';')){const m=rule.trim().match(/^((?:Mo|Tu|We|Th|Fr|Sa|Su)(?:-(?:Mo|Tu|We|Th|Fr|Sa|Su))?(?:,(?:Mo|Tu|We|Th|Fr|Sa|Su)(?:-(?:Mo|Tu|We|Th|Fr|Sa|Su))?)*)\s+((?:\d{2}:\d{2}-\d{2}:\d{2})(?:,\s*\d{2}:\d{2}-\d{2}:\d{2})*)$/);if(!m)return {state:'unknown',label:'Horario complejo · consultar ficha'};let set=new Set();for(const s of m[1].split(',')){let [a,b=a]=s.split('-');let i=days.indexOf(a),end=days.indexOf(b);for(let k=0;k<7;k++){set.add(i);if(i===end)break;i=(i+1)%7;}}if([...set].some(d=>usedDays.has(d)))return {state:'unknown',label:'Horario con reglas superpuestas · consultar ficha'};for(const d of set)usedDays.add(d);for(const span of m[2].split(',')){const [a,b]=span.trim().split('-').map(x=>{const [h,n]=x.split(':').map(Number);return n<60&&(h<24||h===24&&n===0)?h*60+n:NaN;});if(!Number.isFinite(a)||!Number.isFinite(b)||a===b||a===1440)return {state:'unknown',label:'Horario no interpretable'};if(a<b?set.has(today)&&min>=a&&min<b:set.has(today)&&min>=a||set.has((today+6)%7)&&min<b)open=true;}}return {state:open?'open':'closed',label:(open?'Abierto':'Cerrado')+' · según horario publicado'};}
function commonsFile(p){const f=p?.wikimedia_commons||p?.image||'';return /^File:[^\r\n<>]{1,240}$/i.test(f)?'File:'+f.slice(5):null;}
return {categories,byId,category,icon,query,exactQuery,normalize,address,safeURL,opening,commonsFile,validCoord};});
