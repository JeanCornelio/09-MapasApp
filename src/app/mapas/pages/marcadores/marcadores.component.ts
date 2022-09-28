import {  AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

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
  constructor() { }


  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom: this.zoomLevel,
    });

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
  }

  irMarcador(){

  }
 
}
