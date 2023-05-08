import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

import { getDatabase, ref, set } from "firebase/database";
import { RegisterServiceService } from './services/register-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'finalproject';
  isSignedIn = false
  myForm: FormGroup;
  showTheErrorMessage:string = "";
  constructor( public firebaseService: FirebaseService , public userRegisterService: RegisterServiceService){

    this.myForm = new FormGroup({

    });
  }
  ngOnInit()  {

    if(localStorage.getItem('user') !== null)
    this.isSignedIn = true
    else
    this.isSignedIn = false

  }
  async getuserdata(email:string,username:string,nicnumber:string,password:string,reenterpassword:string,policetation:string){

      if(username.trim()===''){
        this.showTheErrorMessage = "Please enter your name";
        return;
      }else if(password.length <5){
        this.showTheErrorMessage = "Passwords is too short";

      }
      else if(password !== reenterpassword){
        this.showTheErrorMessage = "Passwords are not matching";
        return;

      }
      else if( nicnumber==='' ){
        this.showTheErrorMessage = "Please enter your NIC number";
        return;

      }else if(policetation =="Select your police station"){
        this.showTheErrorMessage = "Select a police station";
        return;

      }else if(email.trim()==='' ){
        this.showTheErrorMessage = "No email address";
        return;

      }
      else{
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

    if(email.trim() ===""){
      this.showTheErrorMessage = "No email address";
    return;

    }else  if(password.trim() === ""){
      this.showTheErrorMessage = "Enter your password";
    return;

    }
    
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


