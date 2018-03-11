import { Restaurante } from './../../models/restaurante';
import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { RestaurantesService } from './../../servicios/restaurantes';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-restaurante',
  templateUrl: 'restaurante.html'
})
export class RestaurantePage {
  restaurante: Restaurante;
  indice: number;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              private restaurantesService: RestaurantesService,
              private socialSharing: SocialSharing) {
    this.restaurante = navParams.get('restaurante');
    this.indice = navParams.get('indice');
  }

  cerrar(){
    this.viewCtrl.dismiss();
  }

  borrar(){
    this.restaurantesService.borrarRestaurante(this.indice);
    this.cerrar();
  }

  compartirConWhatsApp(){
    let mensaje = this.restaurante.nombre;
    let url = "http://www.google.com/maps/@" 
              + this.restaurante.ubicacion.lat + ","
              + this.restaurante.ubicacion.lng + ",9z?hl=es";
    console.log('imagenes: ' + this.restaurante.imagenes[0]);
    this.socialSharing.shareViaWhatsApp(mensaje, this.restaurante.imagenes[0], url)
                .catch(error => console.log("error:" + error));
  }
}
