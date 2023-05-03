import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

import { getDatabase, ref, set } from "firebase/database";
import { RegisterServiceService } from './services/register-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'finalproject';
  isSignedIn = false

  constructor( public firebaseService: FirebaseService , public userRegisterService: RegisterServiceService){}
  ngOnInit()  {

    if(localStorage.getItem('user') !== null)
    this.isSignedIn = true
    else
    this.isSignedIn = false

  }
  async getuserdata(email:string,username:string,nicnumber:string,password:string,reenterpassword:string,policetation:string){

    if(email.trim()==='' || username.trim()==='' || nicnumber==='' || policetation===''){
      alert("Please provide all information");
    } else{
      await this.userRegisterService.userRegister(email,username,nicnumber,policetation)
      this.isSignedIn = true
    }

   }

  async OnsignUp(email:string , password:string){

   await this.firebaseService.signUp(email, password)
   if(this.firebaseService.isLoogedIn)
   this.isSignedIn = true
  }
  async Onsignin(email:string , password:string){
    await this.firebaseService.signIn(email, password)
    if(this.firebaseService.isLoogedIn)
    this.isSignedIn = true
   }
   handleLogout(){
    this.isSignedIn = false
   }

 getName(data:string):string{
  return "dwad";
 }



}


