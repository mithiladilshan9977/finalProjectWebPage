import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getDatabase, onValue, ref, set } from "firebase/database";


@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  uid: string | undefined;
  constructor(public afAuth: AngularFireAuth ) {
    this.afAuth.authState.subscribe((user) =>{
      if(user){
        this.uid = user.uid;
      }
    })
  }

  ngOnInit(): void {


  }

  async userRegister(email:string,username:string,nicnumber:string, policetation:string){
alert("User registed suucessfully");
    const db = getDatabase();

  set(ref(db, 'HeadPolice/' +  policetation + this.uid), {

    username: username,
    email: email,
    nicnumber:nicnumber,
    policesationname:policetation,

  });




  }

}


