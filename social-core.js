/* V10: bounded, validated share payloads and client-side live encryption. */
(function(root){'use strict';
const C=()=>globalThis.crypto, enc=new TextEncoder(), dec=new TextDecoder('utf-8',{fatal:true});
const tokenPattern=/^[A-Za-z0-9_-]{43}$/,idPattern=/^[A-Za-z0-9_-]{22}$/;
function b64(bytes){return btoa(String.fromCharCode(...bytes)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
function unb64(s){if(typeof s!=='string'||!/^[A-Za-z0-9_-]+$/.test(s)||s.length>16000)throw Error('Formato inválido');return Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/')),x=>x.charCodeAt(0));}
const random=(n=32)=>b64(C().getRandomValues(new Uint8Array(n)));
function coords(c){if(!Array.isArray(c)||c.length!==2||!c.every(Number.isFinite)||Math.abs(c[0])>180||Math.abs(c[1])>85.051129)throw Error('Coordenadas inválidas');return c.map(x=>Math.round(x*1e6)/1e6);}
function name(v){return typeof v==='string'?v.trim().slice(0,100)||'Lugar':'Lugar';}
function point(p){if(!p||typeof p!=='object')throw Error('Lugar inválido');return {name:name(p.name),c:coords(p.c)};}
function endpoint(s){const u=new URL(s);if(u.protocol!=='https:'||!u.hostname.endsWith('.workers.dev')||u.username||u.password||u.port||u.pathname!=='/'||u.search||u.hash)throw Error('Ingresá la URL HTTPS raíz del Worker (workers.dev)');return u.origin;}
function snapshot(p){if(!p||p.v!==1)throw Error('Versión inválida');switch(p.kind){case 'place':case 'location':return {v:1,kind:p.kind,point:point(p.point)};case 'route':{if(!Array.isArray(p.stops)||p.stops.length>8||!['car','moto','bike','foot'].includes(p.mode))throw Error('Itinerario inválido');return {v:1,kind:'route',origin:point(p.origin),dest:point(p.dest),stops:p.stops.map(point),mode:p.mode};}case 'list':if(!Array.isArray(p.points)||!p.points.length||p.points.length>20)throw Error('Lista inválida');return {v:1,kind:'list',name:name(p.name),points:p.points.map(point)};case 'live':if(!idPattern.test(p.id)||!tokenPattern.test(p.read)||!tokenPattern.test(p.key)||!Number.isSafeInteger(p.expires))throw Error('Sesión inválida');return {v:1,kind:'live',endpoint:endpoint(p.endpoint),id:p.id,read:p.read,key:p.key,expires:p.expires};default:throw Error('Tipo inválido');}}
function pack(p){const s=b64(enc.encode(JSON.stringify(snapshot(p))));if(s.length>12000)throw Error('Enlace demasiado largo');return s;}
function unpack(s){return snapshot(JSON.parse(dec.decode(unb64(s))));}
function fix(p,now=Date.now()){const t=p?.timestamp,a=p?.coords?.accuracy;if(!Number.isFinite(t)||t>now+5000||now-t>30000||!Number.isFinite(a)||a<0||a>100)throw Error('Esperando GPS reciente y preciso');return {c:coords([p.coords.longitude,p.coords.latitude]),at:Math.round(t),accuracy:Math.round(a)};}
function liveData(p){if(!p||!Number.isSafeInteger(p.at)||!Number.isFinite(p.accuracy)||p.accuracy<0||p.accuracy>100||!['moving','arrived'].includes(p.state))throw Error('Dato inválido');return {c:coords(p.c),at:p.at,accuracy:p.accuracy,state:p.state};}
function fresh(at,now=Date.now()){return Number.isSafeInteger(at)&&at<=now+5000&&now-at<=45000;}
async function key(s){if(!tokenPattern.test(s))throw Error('Clave inválida');return C().subtle.importKey('raw',unb64(s),'AES-GCM',false,['encrypt','decrypt']);}
async function seal(p,k,id){const iv=C().getRandomValues(new Uint8Array(12));const data=await C().subtle.encrypt({name:'AES-GCM',iv,additionalData:enc.encode(id)},await key(k),enc.encode(JSON.stringify(liveData(p))));return b64(iv)+'.'+b64(new Uint8Array(data));}
async function open(s,k,id){if(typeof s!=='string'||s.length>1024)throw Error('Cifrado inválido');const [a,b,...rest]=s.split('.');if(rest.length||!a||!b||unb64(a).length!==12)throw Error('Cifrado inválido');const data=await C().subtle.decrypt({name:'AES-GCM',iv:unb64(a),additionalData:enc.encode(id)},await key(k),unb64(b));return liveData(JSON.parse(dec.decode(data)));}
async function request(ep,action,data){const c=new AbortController(),timer=setTimeout(()=>c.abort(),10000);try{const r=await fetch(endpoint(ep)+'/v1/'+action,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',redirect:'error',signal:c.signal});if(!r.ok){const e=Error('Servicio: '+r.status);e.status=r.status;throw e;}return await r.json();}finally{clearTimeout(timer);}}
const api={random,coords,point,endpoint,snapshot,pack,unpack,fix,fresh,seal,open,request,tokenPattern,idPattern};if(typeof module!=='undefined')module.exports=api;else root.ViceSocial=api;
})(globalThis);
