/* V11: portable iOS integration helpers. No network or device access. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ViceIOS=api;})(globalThis,()=>{
'use strict';
const defaults={awake:true,eco:false,arrival:false,badge:false};
function prefs(value){const result={...defaults};for(const k of Object.keys(defaults))if(typeof value?.[k]==='boolean')result[k]=value[k];return result;}
function coord(c){return Array.isArray(c)&&c.length===2&&c.every(Number.isFinite)&&Math.abs(c[0])<=180&&Math.abs(c[1])<=90;}
function appleURL(c,mode){if(!coord(c))throw Error('Coordenadas inválidas');const url=new URL('https://maps.apple.com/');url.searchParams.set('daddr',`${c[1]},${c[0]}`);if(mode==='car')url.searchParams.set('dirflg','d');if(mode==='foot')url.searchParams.set('dirflg','w');return url.href;}
const actions=['map','saved','history','transit','settings','home','work'];
function shortcut(url){try{const a=new URL(url).searchParams.get('vice-action');return actions.includes(a)?a:null;}catch{return null;}}
function shortcutURL(base,action){if(!actions.includes(action))throw Error('Acceso inválido');const u=new URL('./index.html',base);u.searchParams.set('vice-action',action);return u.href;}
function escapeICS(s){return String(s).replace(/\\/g,'\\\\').replace(/\r\n|\r|\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g,'');}
function stamp(ms){return new Date(ms).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');}
function fold(s){const enc=new TextEncoder();let line='',bytes=0,lines=[];for(const ch of s){const n=enc.encode(ch).length;if(bytes+n>75){lines.push(line);line=' ';bytes=1;}line+=ch;bytes+=n;}lines.push(line);return lines.join('\r\n');}
function calendar({name,start,end,uid,now=Date.now(),c}){if(!Number.isFinite(start)||!Number.isFinite(end)||end<=start||end-start>7*86400000||!Number.isFinite(now)||!/^[-a-zA-Z0-9.]+$/.test(uid)||!coord(c))throw Error('Datos de evento inválidos');return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Vice Maps//V11//ES','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${uid}@vice-maps.local`,`DTSTAMP:${stamp(now)}`,`DTSTART:${stamp(start)}`,`DTEND:${stamp(end)}`,`SUMMARY:${escapeICS('Viaje: '+String(name).slice(0,160))}`,`LOCATION:${escapeICS(c[1]+','+c[0])}`,'DESCRIPTION:Evento planificado en Vice Maps. No representa tráfico futuro confirmado.','END:VEVENT','END:VCALENDAR',''].map(fold).join('\r\n');}
function camera(eco){return eco?{interval:1600,duration:0,pitch:0}:{interval:700,duration:650,pitch:58};}
return {prefs,coord,appleURL,actions,shortcut,shortcutURL,calendar,camera};});
