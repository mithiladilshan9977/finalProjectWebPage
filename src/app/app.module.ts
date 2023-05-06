import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";

import  { AngularFireModule} from '@angular/fire/compat';
import { HomeComponent } from './home/home.component';
import { FirebaseService } from './services/firebase.service';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { Route, Router, RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { PolicememberComponent } from './policemember/policemember.component';
// import { AngularFireDatabase } from 'angularfire2/database';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RegisterServiceService } from './services/register-service.service';
import { GetDataServiceService } from './services/get-data-service.service';
import { AllMembersComponent } from './all-members/all-members.component';
import { PoliceManChatComponent } from './policemember/police-man-chat/police-man-chat.component';

 const routes:Routes = [
     {path:"dashboard", component:DashBoardComponent},
     {path:"members", component:PolicememberComponent},
     {path:"allmembers",component:AllMembersComponent},
     {path:"policemember/police-man-chat",component:PoliceManChatComponent}
 ]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashBoardComponent,
    PolicememberComponent,
    AllMembersComponent,
    PoliceManChatComponent
  ],
  imports: [
    AngularFireDatabaseModule,
    BrowserModule,
    AngularFireAuthModule,
    AppRoutingModule,

    RouterModule.forChild(routes),
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
  exports:[RouterModule] ,
  providers: [FirebaseService,RegisterServiceService,GetDataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
