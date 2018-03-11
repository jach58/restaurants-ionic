import { Ubicacion } from './ubicacion';

export class Restaurante {
  constructor(public nombre:string, 
              public ubicacion: Ubicacion,
              public imagenes: string[],
              public rating: number){}
}