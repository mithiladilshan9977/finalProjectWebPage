import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoogedIn = false
  constructor(public firebaseAuth: AngularFireAuth ) { }

  async signIn(email: string , password : string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).
    then(res =>{
      this.isLoogedIn = true
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }

  async signUp(email: string , password : string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password).
    then(res =>{
      this.isLoogedIn = true
      localStorage.setItem('user', JSON.stringify(res.user))
      console.log(email,password )
    })

    // this.db.list('Messages').valueChanges().subscribe((users) => {
    //   console.log(users);

    // });


  }
  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }

}
