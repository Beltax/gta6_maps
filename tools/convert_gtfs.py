#!/usr/bin/env python3
"""Convert an authorized GTFS Schedule ZIP to Vice Maps JSON, without external dependencies."""
import argparse,csv,io,json,zipfile,math,datetime
from collections import defaultdict
from zoneinfo import ZoneInfo
p=argparse.ArgumentParser(description=__doc__);p.add_argument('zip');p.add_argument('output');p.add_argument('--source',required=True,help='Publisher/source and license');a=p.parse_args()
with zipfile.ZipFile(a.zip) as z:
    files={n.rsplit('/',1)[-1]:n for n in z.namelist() if n.endswith('.txt')}
    def rows(name,required=False):
        if name not in files:
            if required: raise ValueError('Missing '+name)
            return []
        if z.getinfo(files[name]).file_size>150_000_000: raise ValueError('File exceeds safety limit')
        with z.open(files[name]) as f:return list(csv.DictReader(io.TextIOWrapper(f,encoding='utf-8-sig',newline='')))
    def seconds(s):
        h,m,t=map(int,s.split(':'));assert 0<=m<60 and 0<=t<60 and 0<=h<48;return h*3600+m*60+t
    agencies=rows('agency.txt',True);tz={r['agency_timezone'] for r in agencies};assert len(tz)==1,'Multiple timezones not supported';timezone=tz.pop();ZoneInfo(timezone)
    stops=[]
    for s in rows('stops.txt',True):
        if s.get('location_type','') not in ('','0'):continue
        c=[float(s['stop_lon']),float(s['stop_lat'])];assert all(math.isfinite(x) for x in c) and abs(c[0])<=180 and abs(c[1])<=90
        stops.append(dict(id=s['stop_id'],name=s['stop_name'],c=c,access=s.get('wheelchair_boarding','')))
    ids={s['id'] for s in stops};routes={r['route_id']:dict(id=r['route_id'],name=r.get('route_short_name') or r.get('route_long_name') or r['route_id'],long=r.get('route_long_name',''),type=int(r['route_type'])) for r in rows('routes.txt',True)}
    days='monday tuesday wednesday thursday friday saturday sunday'.split();cal={r['service_id']:dict(start=r['start_date'],end=r['end_date'],days=[int(r[d]) for d in days]) for r in rows('calendar.txt')};exc=defaultdict(dict)
    for r in rows('calendar_dates.txt'):exc[r['service_id']][r['date']]=int(r['exception_type'])
    assert cal or exc,'No calendar data'
    times=defaultdict(list);bad=set()
    for r in rows('stop_times.txt',True):
        try:
            assert r['stop_id'] in ids
            times[r['trip_id']].append((int(r['stop_sequence']),[r['stop_id'],seconds(r['arrival_time']),seconds(r['departure_time']),int(r.get('pickup_type') or 0),int(r.get('drop_off_type') or 0)]))
        except (ValueError,KeyError,AssertionError):bad.add(r['trip_id'])
    freq=defaultdict(list)
    for r in rows('frequencies.txt'):freq[r['trip_id']].append(dict(start=seconds(r['start_time']),end=seconds(r['end_time']),headway=int(r['headway_secs']),exact=r.get('exact_times')=='1'))
    trips=[];skipped=0
    for r in rows('trips.txt',True):
        i=r['trip_id'];t=[v for _,v in sorted(times[i])];last=-1;ok=i not in bad and len(t)>=2 and r['route_id'] in routes
        for x in t:
            if x[1]<last or x[2]<x[1]:ok=False
            last=x[2]
        if not ok:skipped+=1;continue
        trips.append(dict(id=i,route=r['route_id'],service=r['service_id'],headsign=r.get('trip_headsign',''),times=t,frequencies=freq[i]))
    transfers={};no_transfers=False
    for r in rows('transfers.txt'):
        # Only generic same-stop constraints supported; disable combinations on complex rules.
        if r.get('from_stop_id')!=r.get('to_stop_id') or any(r.get(k) for k in ('from_route_id','to_route_id','from_trip_id','to_trip_id')) or r.get('transfer_type') not in ('0','1','2','3'):no_transfers=True;continue
        k=r['from_stop_id'];v=-1 if r['transfer_type']=='3' else int(r.get('min_transfer_time') or 0);transfers[k]=-1 if -1 in (v,transfers.get(k)) else max(v,transfers.get(k,0))
    if rows('pathways.txt'):no_transfers=True
    data=dict(schema=1,source=a.source,converted=datetime.datetime.now(datetime.timezone.utc).isoformat(),timezone=timezone,stops=stops,routes=routes,calendar=cal,exceptions=exc,trips=trips,transfers=transfers,noTransfers=no_transfers,skipped=skipped)
    blob=json.dumps(data,ensure_ascii=False,separators=(',',':')).encode();assert len(blob)<=25*1024*1024 and len(stops)<=30000 and len(trips)<=60000 and sum(len(t['times']) for t in trips)<=800000,'Feed too large: use regional feed'
    with open(a.output,'wb') as f:f.write(blob)
    print(f'{len(stops)} stops; {len(trips)} trips; {skipped} skipped; {len(blob)} bytes; transfers {not no_transfers}')
