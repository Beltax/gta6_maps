"""Synthetic fixture only; verifies CSV/ZIP conversion, exceptions, frequencies and omitted invalid times."""
import tempfile,zipfile,subprocess,json,pathlib,sys
root=pathlib.Path(__file__).resolve().parent.parent
with tempfile.TemporaryDirectory() as td:
    z=pathlib.Path(td)/'fixture.zip';o=pathlib.Path(td)/'feed.json'
    files={'agency.txt':'agency_name,agency_timezone\nTest,America/Argentina/Tucuman\n','stops.txt':'stop_id,stop_name,stop_lat,stop_lon\na,Parada A,-26,-65\nb,Parada B,-26,-65.03\n','routes.txt':'route_id,route_short_name,route_type\nr,1,3\n','trips.txt':'route_id,service_id,trip_id,trip_headsign\nr,s,t,Centro\nr,s,bad,Centro\n','stop_times.txt':'trip_id,arrival_time,departure_time,stop_id,stop_sequence\nt,25:00:00,25:00:00,a,1\nt,25:10:00,25:10:00,b,2\nbad,,,a,1\n','calendar_dates.txt':'service_id,date,exception_type\ns,20261124,1\n','frequencies.txt':'trip_id,start_time,end_time,headway_secs,exact_times\nt,25:00:00,26:00:00,600,0\n','transfers.txt':'from_stop_id,to_stop_id,transfer_type\na,b,2\n'}
    with zipfile.ZipFile(z,'w') as f:
        for n,v in files.items():f.writestr(n,v)
    subprocess.run([sys.executable,str(root/'tools/convert_gtfs.py'),str(z),str(o),'--source','Synthetic test'],check=True)
    f=json.loads(o.read_text());assert f['skipped']==1 and f['noTransfers'] and f['trips'][0]['times'][0][1]==90000 and f['trips'][0]['frequencies'][0]['exact']==False and f['exceptions']['s']['20261124']==1
    subprocess.run(['node','-e',f"const T=require({json.dumps(str(root/'transit-core.js'))});T.validate(require({json.dumps(str(o))}));"],check=True)
print('PASS GTFS ZIP converter and JS schema compatibility')
