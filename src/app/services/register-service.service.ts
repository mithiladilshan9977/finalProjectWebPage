import { Injectable } from '@angular/core';
import { getDatabase, ref, set } from "firebase/database";
@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor() { }

  async userRegister(email:string,username:string,nicnumber:string){

    const db = getDatabase();

  set(ref(db, 'HeadPolice/' + username), {
    username: username,
    email: email,
    nicnumber:nicnumber,

  });
  }
}
