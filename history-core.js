'use strict';
/* Pure functions for local GPS logs. No provider route geometry or predicted distance. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ViceHistory=api;})(globalThis,()=>{
 const MAX_TRIPS=60,MAX_POINTS=800,MAX_TOTAL=30000,MAX_GAP=60000;
 const valid=c=>Array.isArray(c)&&c.length>=2&&Number.isFinite(c[0])&&Number.isFinite(c[1])&&Math.abs(c[0])<=180&&Math.abs(c[1])<=90;
 function distance(a,b){const r=Math.PI/180,dl=(b[0]-a[0])*r,dp=(b[1]-a[1])*r,h=Math.sin(dp/2)**2+Math.cos(a[1]*r)*Math.cos(b[1]*r)*Math.sin(dl/2)**2;return 6371000*2*Math.asin(Math.sqrt(Math.min(1,h)));}
 function dateKey(t){const d=new Date(t);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
 function create({id,mode='unknown',kind='nav',name='',now=Date.now()}){return {id,mode,kind,name:String(name).slice(0,160),start:now,end:now,day:dateKey(now),state:'active',meters:0,seconds:0,moving:0,points:[],last:null,lastSeen:null,truncated:false,breakNext:false,visits:[]};}
 function sample(t,p,now=Date.now()){
  if(!t||t.state!=='active')return false;const c=[p?.coords?.longitude,p?.coords?.latitude],a=p?.coords?.accuracy,ts=p?.timestamp;
  if(!valid(c)||!Number.isFinite(a)||a<0||a>50||!Number.isFinite(ts)||ts<t.start-2000||ts>now+2000||now-ts>15000||ts<=(t.lastSeen??-Infinity))return false;
  t.lastSeen=ts;const old=t.last,dt=old?ts-old[2]:0,gap=!!old&&(dt>MAX_GAP||t.breakNext);const d=old?distance(old,c):0;
  if(old&&!gap&&dt<3000)return false;
  if(old&&!gap&&d>Math.max(40,dt/1000*75)){t.breakNext=true;return false;}
  if(old&&!gap&&d<Math.max(8,Math.min(25,(a+old[3])/2))){if(dt<15000)return false;}
  const moving=old&&!gap&&d>=Math.max(8,Math.min(25,(a+old[3])/2));
  if(old&&!gap){t.seconds+=dt/1000;if(moving){t.meters+=d;t.moving+=dt/1000;}}
  t.end=Math.max(t.start,ts);const point=[+c[0].toFixed(5),+c[1].toFixed(5),ts,a,(!old||gap)?1:0];t.last=[...c,ts,a];t.breakNext=false;
  if(t.points.length<MAX_POINTS)t.points.push(point);else {t.truncated=true;/* Keep first part and most recent point; never connect across omitted trace. */if(t.points.length===MAX_POINTS)t.points[MAX_POINTS-1]=[...point.slice(0,4),1];}
  return true;
 }
 function finish(t,state,now=Date.now()){if(!t)return null;return {...t,state,end:Math.max(t.start,Math.min(now,t.end)),last:null,lastSeen:null,breakNext:false};}
 function visit(t,name,c,now=Date.now()){if(t&&valid(c)&&t.visits.length<20)t.visits.push({name:String(name||'Destino').slice(0,160),c:c.slice(0,2),at:now});}
 function retain(rows){const out=[];let points=0;for(const t of rows.slice().sort((a,b)=>b.start-a.start)){if(out.length>=MAX_TRIPS||points+t.points.length>MAX_TOTAL)break;out.push(t);points+=t.points.length;}return out;}
 function select(rows,period,key){return rows.filter(t=>period==='all'||(period==='year'?t.day.slice(0,4)===key:period==='month'?t.day.slice(0,7)===key:t.day===key));}
 function stats(rows){return rows.reduce((a,t)=>{a.trips++;a.meters+=t.meters;a.seconds+=t.seconds;a.moving+=t.moving;a.arrivals+=t.state==='arrived'?1:0;a.visits+=t.visits.length;a.modes[t.mode]=(a.modes[t.mode]||0)+t.meters;return a;},{trips:0,meters:0,seconds:0,moving:0,arrivals:0,visits:0,modes:{}});}
 function segments(t){const out=[];for(const p of t.points){if(!valid(p))continue;if(!out.length||p[4])out.push([]);out.at(-1).push(p);}return out;}
 function zones(rows){const cells=new Map();for(const t of rows)for(const p of t.points){if(!valid(p))continue;const x=Math.floor(Math.min(179.999999,p[0])*100),y=Math.floor(Math.min(89.999999,p[1])*100),key=x+','+y;if(!cells.has(key))cells.set(key,[x/100,y/100]);}return [...cells.values()];}
 function geo(rows,kind='trace'){const features=[];if(kind==='zones'){for(const [x,y] of zones(rows))features.push({type:'Feature',properties:{},geometry:{type:'Polygon',coordinates:[[[x,y],[x+.01,y],[x+.01,y+.01],[x,y+.01],[x,y]]]}});}else for(const t of rows)for(const s of segments(t)){features.push({type:'Feature',properties:{id:t.id},geometry:s.length>1?{type:'LineString',coordinates:s.map(p=>p.slice(0,2))}:{type:'Point',coordinates:s[0].slice(0,2)}});}return {type:'FeatureCollection',features};}
 const xml=s=>String(s).replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]));
 function gpx(rows){return '<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="Vice Maps" xmlns="http://www.topografix.com/GPX/1/1">'+rows.map(t=>'<trk><name>'+xml(t.name||'Viaje')+'</name>'+segments(t).map(s=>'<trkseg>'+s.map(p=>`<trkpt lat="${p[1]}" lon="${p[0]}"><time>${new Date(p[2]).toISOString()}</time></trkpt>`).join('')+'</trkseg>').join('')+'</trk>').join('')+'</gpx>';}
 return {MAX_TRIPS,MAX_POINTS,MAX_TOTAL,MAX_GAP,create,sample,finish,visit,retain,select,stats,segments,zones,geo,gpx,dateKey,distance};
});
