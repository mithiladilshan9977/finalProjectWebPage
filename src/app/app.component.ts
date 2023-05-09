import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

import { getDatabase, ref, set } from "firebase/database";
import { RegisterServiceService } from './services/register-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


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
  uid:string = '';
  constructor( public firebaseService: FirebaseService , public userRegisterService: RegisterServiceService,private afAuth: AngularFireAuth,public router: Router){

    this.myForm = new FormGroup({

    });



  }
  ngOnInit()  {

    if(localStorage.getItem('user') !== null)
    this.isSignedIn = true
    else
    this.isSignedIn = false

  }


        // this.isSignedIn = true


        // // Insert data into the HeadPolice node




// thsi is a async mthod
  getuserdata(email:string,username:string,nicnumber:string,password:string,reenterpassword:string,policetation:string){


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
  }else{
    const db = getDatabase();


    this.afAuth.authState.subscribe((user) =>{
     if(user){

       set(ref(db, 'HeadPolice/' + '/'+user.uid  ), {
         username: username,
         email: email,
         nicnumber: nicnumber,
         policesationname: policetation,
       }).then(() => {
          this.isSignedIn = true;

         this.router.navigate(['/dashboard']);

       });
     }
   })
  }

  }
  async OnSighUp(email:string , password:string){

    await this.firebaseService.signUp(email,password)
    if(this.firebaseService.isLoogedIn){
      this.isSignedIn = true;
    }
  }

  async Onsignin(email:string , password:string){

    if(email.trim() ===""){
      this.showTheErrorMessage = "No email address";
    return;

    }else  if(password.trim() === ""){
      this.showTheErrorMessage = "Enter your password";
    return;

    }else{
      await this.firebaseService.signIn(email, password)
      if(this.firebaseService.isLoogedIn)
      this.isSignedIn = true
    }


   }


   handleLogout(){
    this.isSignedIn = false
   }





}


