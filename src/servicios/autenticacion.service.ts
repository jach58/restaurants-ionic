import firebase from 'firebase'

export class AutenticacionService{
  registrarUsuario(correo:string, clave:string){
    return firebase.auth().createUserWithEmailAndPassword(correo, clave);
  }

  inicarSesion(correo:string, clave:string){
    return firebase.auth().signInWithEmailAndPassword(correo, clave);
  }

  terminarSesion(){
    firebase.auth().signOut();
  }
}