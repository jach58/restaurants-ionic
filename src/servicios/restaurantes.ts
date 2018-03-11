import { Ubicacion } from './../models/ubicacion';
import { Restaurante } from './../models/restaurante';

import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file'
import { Injectable } from '@angular/core'
import { ToastController } from 'ionic-angular'

declare var cordova;

@Injectable()
export class RestaurantesService {
  constructor(private storage: Storage, 
              public toastCtrl:ToastController,
              private file: File){}
  private restaurantes: Restaurante[] = [];

  agregarRestaurante(nombre: string, 
                     ubicacion: Ubicacion,
                     imagenes:string[], 
                     rating: number){
    let restaurante = new Restaurante(nombre, ubicacion, imagenes, rating);
    
    this.restaurantes.push(restaurante);
    this.storage.set('restaurantes', this.restaurantes)
                .then()
                .catch(error => 
                { 
                  this.restaurantes.splice(this.restaurantes
                                          .indexOf(restaurante), 1)
                });
  }

  cargarRestaurantes(){
    return this.restaurantes.slice();
  }

  fetchPlaces(){
    return this.storage.get('restaurantes')
                .then((restaurantes: Restaurante[]) => {
                  this.restaurantes = restaurantes != null ? restaurantes:[];
                  return this.restaurantes;
                  
                })
                .catch(error => {
                  const toast = this.toastCtrl.create({
                          message: 'Fetch:' + error,
                          duration: 4000
                        });
                        toast.present();
                  }
                );
  }

  borrarRestaurante(index: number){
    const restaurante = this.restaurantes[index];
    this.restaurantes.splice(index, 1);
    this.storage.set('restaurantes', this.restaurantes)
                .then(
                  () => {
                    this.borrarImagen(restaurante)
                  }
                )
                .catch(error => {
                  const toast = this.toastCtrl.create({
                          message: 'ERROR:' + error,
                          duration: 5000
                        });
                        toast.present();
                  }
                )
  }

  private borrarImagen(restaurante: Restaurante){
    restaurante.imagenes.forEach((imagen) => {
      let nombre = imagen.replace(/^.*[\\\/]/, '');
      this.file.removeFile(cordova.file.dataDirectory, nombre)
        .then()
        .catch(
          (error) => {
            const toast = this.toastCtrl.create({
                            message: 'Error:' + nombre + ' ' + error,
                            duration: 5000
                          });
            toast.present();
                  
            this.agregarRestaurante(restaurante.nombre, 
                                    restaurante.ubicacion,
                                    restaurante.imagenes, 
                                    restaurante.rating);
          }
        )
    });
    
    
  }
}