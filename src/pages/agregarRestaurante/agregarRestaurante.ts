import { Component } from '@angular/core';
import { ModalController, ToastController, 
         LoadingController, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Ubicacion } from './../../models/ubicacion';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File, Entry } from '@ionic-native/file';

import { RestaurantesService } from './../../servicios/restaurantes';

declare var cordova:any;

@Component({
  selector: 'page-agregarRestaurante',
  templateUrl: 'agregarRestaurante.html'
})
export class AgregarRestaurantePage {
  ubicacion:Ubicacion = {
    lat: 4.2243142,
    lng: -77.7284417
  };
  locationIsSet = false;
  imagenes= [];
  rating = 0;

  constructor(public modalCtrl:ModalController,
              public loadingCtrl:LoadingController,
              public toastCtrl:ToastController,
              public restaurantesService:RestaurantesService,
              public viewCtlr: ViewController,
              private geolocation: Geolocation,
              private camera: Camera,
              private file: File){}

  agregarRestaurante(form: NgForm){
    this.restaurantesService.agregarRestaurante(form.value.title,
                                          this.ubicacion,
                                          this.imagenes,
                                          form.value.rating);
    form.reset();
    this.ubicacion = {
      lat: 4.2243142,
      lng: -77.7284417
    };
    this.imagenes = [];
    this.locationIsSet = false;
    this.viewCtlr.dismiss();
  }

  localizar(){
    const loader = this.loadingCtrl.create({
      content: 'Buscando tu ubicación.'
    });
    loader.present();
    this.geolocation.getCurrentPosition({timeout:3000})
               .then(
                 location => {
                   loader.dismiss();
                   //this.ubicacion.lat = location.coords.latitude;
                   //this.ubicacion.lng = location.coords.longitude;
                   this.ubicacion.lat = 4.6486259;
                   this.ubicacion.lng = -74.2478934;
                   this.locationIsSet = true;
                 }
               )
               .catch(error => { 
                 loader.dismiss();
                 let toast = this.toastCtrl.create({
                  message: 'No se pudo encontrar la ubicación.',
                  duration: 2000
                 });
                 toast.present();
                });
  }

  tomarFoto(){
    this.camera.getPicture({
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    })
    .then(
      infoImagen => {
        let nombre = infoImagen.replace(/^.*[\\\/]/, '');
        let path = infoImagen.replace(/[^\/]*$/, '');
        let nuevoNombre = new Date().getUTCMilliseconds() + '.jpg';
        this.file.moveFile(path, nombre, 
                      cordova.file.dataDirectory, nuevoNombre)
                      .then( (data:Entry) => {
                        this.imagenes.push(data.nativeURL);
                        this.camera.cleanup();
                      })
                      .catch(error => {
                        this.imagenes = [];
                        const toast = this.toastCtrl.create({
                          message: 'Ocurrió un error. File.moveFile',
                          duration: 2000
                        });
                        toast.present();
                        this.camera.cleanup();
                      });
        //this.imagenes.push(infoImagen);
      }
    )
    .catch(error => {
                        this.imagenes = [];
                        let toast = this.toastCtrl.create({
                          message: 'Ocurrió un error. Camera.getPicture',
                          duration: 2000
                        });
                        toast.present();
                        this.camera.cleanup();
                      });
  }
}
