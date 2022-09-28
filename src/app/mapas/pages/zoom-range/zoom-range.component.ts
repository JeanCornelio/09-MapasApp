import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-zoon-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container{
      width:100%;
      height:100%;
    }

    .row{
      background-color:white;
      border-radius:5px;
      position:fixed;
      bottom:50px;
      left:30px;
      padding:10px;
      z-index:90000;
      white:400px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number]= [ -69.90150789722276, 18.501828157360432 ];


  constructor() { }

//Con este metodo estamos destruyendo todos los listener creados.
  ngOnDestroy(): void {
    this.mapa.off('zoom',()=>{})
    this.mapa.off('zoomend',()=>{})
    this.mapa.off('move',()=>{})
  }
  //Este metodo se ejecuta luego de que el componente esta totalmente cargado despues de el Oninit
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom: this.zoomLevel,
      
    })

    this.mapa.on('zoom', (ev)=>{
      this.zoomLevel = this.mapa.getZoom()
     })
 
     this.mapa.on('zoomend', (ev)=>{
       if(this.mapa.getZoom() > 18){
         this.mapa.zoomTo(18);
       }
      })

      this.mapa.on('move', (ev)=>{
        const target = ev.target; 
        const { lng, lat} = target.getCenter();
        this.center = [lng, lat];
       
      })

  }

  zoom(parameter:boolean){
    (!parameter)?this.mapa.zoomOut():this.mapa.zoomIn();
    
  }

  zoomCambio(valor:string){
   this.mapa.zoomTo(Number(valor))
  }

}
