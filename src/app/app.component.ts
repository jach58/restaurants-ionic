import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { IniciarsesionPage } from './../pages/iniciarsesion/iniciarsesion';
import { AutenticacionService } from './../servicios/autenticacion.service';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;
  homepage = HomePage;
  iniciarSesion = IniciarsesionPage;
  @ViewChild('contenido') contenido:NavController;
  usuarioEstaConectado = false;

  constructor(platform: Platform,
              public menuCtrl: MenuController,
              public autenticacionService : AutenticacionService,
              statusBar : StatusBar,
              splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp({
      apiKey: "AIzaSyB81h4xz4LM_3CPNGV_pKONN7phZOm4Aac",
      authDomain: "restaurantes-74090.firebaseapp.com"
    });
    firebase.auth().onAuthStateChanged(
      usuario => {
        if(usuario != null){
          this.usuarioEstaConectado = true;
          this.contenido.setRoot(this.homepage);
        }
        else{
          this.usuarioEstaConectado = false;
          this.contenido.setRoot(this.iniciarSesion);
        }
      }
    )
  }

  llamarPagina(pagina){
    this.contenido.setRoot(pagina);
    this.menuCtrl.close();
  }

  terminarSesion(){
    this.autenticacionService.terminarSesion();
    this.menuCtrl.close();
  }
}
