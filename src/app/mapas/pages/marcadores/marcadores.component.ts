import {  AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number,number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container{
      width:100%;
      height:100%;
    }
    
    .list-group{
      position: fixed;
      top:20px;
      right: 20px;
      z-index:99;
    }

    li{
      cursor:pointer;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {
  
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number]= [ -69.90150789722276, 18.501828157360432 ];

  //Arreglo de Marcadores 

  marcadores: MarcadorColor[] = [];

  constructor() { }


  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom: this.zoomLevel,
    });

    this.leerLocaleStorage();

/*     const markerHTML : HTMLImageElement = document.createElement('img');
          markerHTML['src'] = '/assets/img/pngwing.com.png';
          markerHTML.style.height = '40px'
          markerHTML.style.width = '40px'
    new mapboxgl.Marker({
          element: markerHTML
          })
          .setLngLat( this.center)
          .addTo(this.mapa)
 */

  }
  agregarMArcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
          .setLngLat(this.center)
          .addTo(this.mapa);


    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });

    this.guardarMArcadoresLocalStorage()

    nuevoMarcador.on('dragend',()=>{
      this.guardarMArcadoresLocalStorage();
    })
  }

  irMarcador(marcador:mapboxgl.Marker){
    this.mapa.flyTo({
      center:marcador.getLngLat()
    })
  }
 

  guardarMArcadoresLocalStorage(){
    
    const lngLatArr: MarcadorColor[] = []; 

    this.marcadores.forEach(m =>{
      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();

      lngLatArr.push({
         color,
         center:[lng,lat]
      })
    })

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }



  leerLocaleStorage(){
    if(!localStorage.getItem('marcadores')){
      return
    }

    const lngLatArr: MarcadorColor[] = JSON.parse( localStorage.getItem('marcadores')!);
    lngLatArr.forEach(m =>{

      const newMarker = new  mapboxgl.Marker({
        draggable: true,
        color:m.color
      })
            .setLngLat(m.center!)
            .addTo(this.mapa);

            this.marcadores.push({
              marker: newMarker,
              color: m.color
            });

            newMarker.on('dragend',()=>{
              this.guardarMArcadoresLocalStorage();
            })

    });

  
    

}
borrarMarcador(i:number){
 this.marcadores[i].marker?.remove();
 this.marcadores.splice(i,1);
 this.guardarMArcadoresLocalStorage();
}

}