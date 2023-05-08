import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService  {

  isLoogedIn = false
  constructor(public firebaseAuth: AngularFireAuth, public router: Router ) { }


  async signIn(email: string , password : string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).
    then(res =>{
      this.router.navigate(['/dashboard']);
      this.isLoogedIn = true

      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }

  async signUp(email: string , password : string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password).
    then(res =>{
      this.router.navigate(['/dashboard']);

      this.isLoogedIn = true
      localStorage.setItem('user', JSON.stringify(res.user))

    })




  }
  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }

}
