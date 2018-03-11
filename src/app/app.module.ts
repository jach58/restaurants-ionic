import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RestaurantePage } from './../pages/restaurante/restaurante';
import { AgmCoreModule } from 'angular2-google-maps/core'
import { RestaurantesService } from './../servicios/restaurantes';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Ionic2RatingModule } from 'ionic2-rating';
import { AgregarRestaurantePage } from './../pages/agregarRestaurante/agregarRestaurante';
import { IonicStorageModule } from '@ionic/storage';
import { IniciarsesionPage } from './../pages/iniciarsesion/iniciarsesion';
import { AutenticacionService } from './../servicios/autenticacion.service';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AgregarRestaurantePage,
    RestaurantePage,
    IniciarsesionPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBow7rC3Bs2kl3Ht_-ZudGGxYtPnEbgeo0'
    }),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AgregarRestaurantePage,
    RestaurantePage,
    IniciarsesionPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
              RestaurantesService, AutenticacionService,
              File, Camera, Geolocation, SocialSharing, SplashScreen, StatusBar],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
