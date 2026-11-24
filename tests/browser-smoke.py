"""Optional Chromium smoke test using synthetic external services, not real network or iOS.
Run: python tests/browser-smoke.py (requires Python playwright and Chromium).
"""
import os,sys,json,mimetypes
from urllib.parse import urlparse
from pathlib import Path
from playwright.sync_api import sync_playwright
os.chdir(Path(__file__).resolve().parent.parent)
mock="""window.maplibregl={Map:class{constructor(){this.c=[-65.2,-26.8];this.s={setData(){}};}once(n,cb){setTimeout(cb,5)}on(){}getCanvas(){return document.getElementById('map')}getCenter(){return {toArray:()=>this.c}}getZoom(){return 16}getLayer(){return false}getSource(n){return ['route','alt'].includes(n)?this.s:null}getBounds(){return {getSouth:()=>-26.82,getNorth:()=>-26.78,getWest:()=>-65.22,getEast:()=>-65.18}}easeTo(){}setPaintProperty(){}setLayoutProperty(){}},Marker:class{constructor(o){this.el=o.element;}setLngLat(){return this}addTo(){document.getElementById('map').append(this.el);return this}remove(){this.el.remove()}},};"""
fixtures={'elements':[{'type':'node','id':123,'lat':-26.8,'lon':-65.2,'tags':{'name':'Café Prueba','amenity':'cafe','opening_hours':'24/7','wheelchair':'yes','phone':'+543811234567','website':'https://example.org','addr:street':'Calle Ejemplo','addr:housenumber':'12'}},{'type':'node','id':124,'lat':-26.801,'lon':-65.201,'tags':{'name':'Otro Café','amenity':'cafe'}}]}
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM','/usr/bin/chromium'),headless=True,args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,service_workers='block')
    errors=[]; calls=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    def handle(route):
        u=route.request.url
        if 'unpkg.com' in u:route.fulfill(status=200,content_type='application/javascript' if u.endswith('.js') else 'text/css',body=mock if u.endswith('.js') else '')
        elif 'openfreemap.org' in u:route.fulfill(status=200,json={'layers':[]})
        elif 'overpass-api.de' in u:calls.append(route.request.post_data);route.fulfill(status=200,json=fixtures)
        elif u.startswith('https://vice.example.test/'): 
            f=Path(urlparse(u).path.lstrip('/') or 'index.html');route.fulfill(status=200,content_type=mimetypes.guess_type(f)[0] or 'application/octet-stream',body=f.read_bytes()) if f.is_file() else route.fulfill(status=404,body='')
        else:route.abort()
    page.route('**/*',handle)
    page.goto('https://vice.example.test/')
    page.wait_for_function('typeof ready!=="undefined" && ready')
    assert page.locator('#categories button').count()==11
    page.locator('[data-tab="explore"]').click();assert page.locator('.explore-grid button').count()==36
    page.get_by_role('button',name='Cafeterías',exact=True).last.click()
    page.wait_for_function('document.querySelectorAll("#results button").length===2')
    assert page.locator('.vice-poi').count()==2
    page.locator('#exploreaccess').check();assert page.locator('#results button').count()==1
    page.locator('#exploreopen').check();assert page.locator('#results button').count()==1
    page.locator('#explorename').fill('nada');assert page.locator('#results button').count()==0
    page.locator('#explorename').fill('Prueba');assert page.locator('#results button').count()==1
    page.locator('#results button').click();assert 'Café Prueba' in page.locator('#destname').inner_text();assert 'Calle Ejemplo 12' in page.locator('#placeinfo').inner_text();assert 'Abierto 24 h' in page.locator('#placeinfo').inner_text();assert page.locator('.vice-dest-pin').count()==1
    page.get_by_role('button',name='★ CONSULTAR VALORACIONES EN LA APP (OPCIONAL)').click();assert page.get_by_role('button',name='CONSULTAR VALORACIONES',exact=True).is_disabled();assert page.locator('script[src*="maps.googleapis.com"]').count()==0
    page.locator('#closesheet').click();page.locator('#planbutton').click();assert page.locator('#sheet').is_visible();page.locator('#closesheet').click();page.locator('#clear').click()
    page.wait_for_timeout(2600);page.locator('[data-poi-cat="cafe"]').click();page.wait_for_function('document.querySelectorAll("#results button").length===1') # persisted filters
    page.locator('#explorescope').select_option('viewport');page.wait_for_timeout(2600);page.locator('#explorego').click();page.wait_for_function('document.querySelectorAll("#results button").length===1');assert any('26.82000' in str(x) for x in calls)
    page.locator('[data-tab="history"]').click()
    assert 'PROGRESO / HISTORIAL' in page.locator('#sheettitle').inner_text()
    assert page.locator('.history-metric').count()==6
    page.get_by_role('button',name='○ Activar registro GPS',exact=True).click()
    assert page.get_by_role('button',name='✓ Registro GPS',exact=True).is_visible()
    page.get_by_role('button',name='○ Incógnito',exact=True).click()
    assert 'INCÓGNITO ACTIVADO' in page.locator('#sheetbody').inner_text()
    page.get_by_role('button',name='✓ Incógnito',exact=True).click()
    assert 'Sin viajes para este período' in page.locator('#sheetbody').inner_text()
    assert page.locator('.history-day').count()>=28
    assert not errors,errors
    browser.close()
print('PASS: Chromium 390×844 mobile emulation, mock MapLibre and Overpass, category search, markers, filters, details, Google opt-in, planning and viewport query')
