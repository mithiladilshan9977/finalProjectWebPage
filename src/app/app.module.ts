import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";

import  { AngularFireModule} from '@angular/fire/compat';
import { HomeComponent } from './home/home.component';
import { FirebaseService } from './services/firebase.service';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AppRoutingModule,

    AngularFirestoreModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyA3IagzsUmfxlH6H6_EV16JG2BViwWZS3I",
      authDomain: "thridfinalyearproject.firebaseapp.com",
      databaseURL: "https://thridfinalyearproject-default-rtdb.firebaseio.com",
      projectId: "thridfinalyearproject",
      storageBucket: "thridfinalyearproject.appspot.com",
      messagingSenderId: "753783961819",
      appId: "1:753783961819:web:d100d60b0f4e63fbdcf4fe",
      measurementId: "G-CVTZQL8P40"
    })

  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
