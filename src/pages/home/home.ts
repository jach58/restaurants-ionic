import { ModalController } from 'ionic-angular';
import { Restaurante } from './../../models/restaurante';
import { AgregarRestaurantePage } from './../agregarRestaurante/agregarRestaurante';
import { Component, OnInit } from '@angular/core';
import { RestaurantesService } from './../../servicios/restaurantes';
import { RestaurantePage } from './../restaurante/restaurante';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  agregarRestaurantePage = AgregarRestaurantePage;
  restaurantes:Restaurante[] = [];

  constructor(private restaurantesService:RestaurantesService,
              private modalCtrl:ModalController) {}

  ngOnInit(){
    this.restaurantesService.fetchPlaces()
        .then(
          (restaurantes: Restaurante[]) => { 
            this.restaurantes = restaurantes
          }
        )
  }

  ionViewWillEnter(){
    this.restaurantes = this.restaurantesService.cargarRestaurantes();
  }

  mostrarRestaurante(restaurante:Restaurante, indice: number){
    let modal = this.modalCtrl.create(RestaurantePage, {restaurante: restaurante, indice: indice});
    modal.present();
  }

}
