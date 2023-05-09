import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getDatabase, onValue, ref, set } from "firebase/database";


@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService  {

  uid: string | undefined;
  constructor(public afAuth: AngularFireAuth ) {
    this.afAuth.authState.subscribe((user) =>{
      if(user){
        this.uid = user.uid;
      }
    })
  }




//   async userRegister(email:string,username:string,nicnumber:string, policetation:string){
// alert(this.uid);
//     const db = getDatabase();


//   set(ref(db, 'HeadPolice/' +  policetation + this.uid), {

//     username: username,
//     email: email,
//     nicnumber:nicnumber,
//     policesationname:policetation,

//   });

//   set(ref(db, 'HeadPolice/' +  this.uid), {

//     policesationname:policetation

//   });





//   }

}


