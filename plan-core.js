/* Planning helpers; provider-independent, testable without network. */
(function(root){'use strict';
const MAX=8, AVOIDS=['tollRoads','motorways','ferries','unpavedRoads'];
const valid=c=>Array.isArray(c)&&c.length===2&&c.every(Number.isFinite)&&Math.abs(c[0])<=180&&Math.abs(c[1])<=90;
function coord(text){const m=String(text).trim().match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);if(!m)return null;const c=[+m[2],+m[1]];return valid(c)?c:null;}
function point(x){if(!valid(x?.c))return null;return {c:x.c.slice(),name:String(x.name||'Punto seleccionado').slice(0,240)};}
function clean(x={}){return {origin:point(x?.origin),stops:(Array.isArray(x?.stops)?x.stops:[]).map(point).filter(Boolean).slice(0,MAX),avoid:AVOIDS.filter(a=>Array.isArray(x?.avoid)&&x.avoid.includes(a)),type:['fastest','shortest','eco'].includes(x?.type)?x.type:'fastest'};}
function requiresTomTom(p,plan){return p==='moto'||plan.avoid.length>0||plan.type!=='fastest';}
function options(p,plan,extra={}){return {...extra,stops:plan.stops.map(s=>s.c),travelMode:p==='moto'?'motorcycle':'car',avoid:plan.avoid,routeType:plan.type};}
function osrmURL(p,origin,dest,plan,alternatives=true){if(!['car','bike','foot'].includes(p)||requiresTomTom(p,plan))throw Error('Perfil no disponible en OSRM');const cs=[origin,...plan.stops.map(s=>s.c),dest];if(!cs.every(valid))throw Error('Coordenadas inválidas');return 'https://routing.openstreetmap.de/routed-'+p+'/route/v1/driving/'+cs.map(c=>c.join(',')).join(';')+'?overview=full&geometries=geojson&steps=true&alternatives='+(alternatives&&plan.stops.length===0);}
function attach(route,plan,origin,profile,waypoints){const stops=plan.stops;let edges=route.stopEdges;if(!edges){if(route.legs?.length!==stops.length+1)throw Error('Número de tramos inesperado');let at=0;edges=route.legs.slice(0,-1).map((leg,i)=>{at+=leg.distance;return {at,c:waypoints?.[i+1]?.location||leg.steps?.at(-1)?.maneuver?.location};});}if(edges.length!==stops.length||edges.some((s,i)=>!valid(s.c)||!Number.isFinite(s.at)||s.at<0||s.at>route.distance+10||(i>0&&s.at<edges[i-1].at)))throw Error('Paradas sin geometría válida');return {...route,trip:{plan:clean(plan),origin:origin.slice(),profile,stops:stops.map((s,i)=>({...s,snap:edges[i].c,at:edges[i].at}))}};}
function reached(stop,meters,c,accuracy,distance){return !!stop&&Number.isFinite(accuracy)&&accuracy<=30&&Math.abs(meters-stop.at)<=Math.max(45,accuracy*1.5)&&distance(c,stop.snap)<=Math.max(35,accuracy*1.5);}
function rank(rs,type){return rs.sort((a,b)=>type==='shortest'?a.distance-b.distance:type==='eco'?0:a.duration-b.duration);}
const api={MAX,AVOIDS,valid,coord,point,clean,requiresTomTom,options,osrmURL,attach,reached,rank};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.VicePlan=api;
})(typeof globalThis!=='undefined'?globalThis:this);
