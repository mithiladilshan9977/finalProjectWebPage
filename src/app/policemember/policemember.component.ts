import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFireDatabase,AngularFireObject  } from '@angular/fire/compat/database';
@Component({
  selector: 'app-policemember',
  templateUrl: './policemember.component.html',
  styleUrls: ['./policemember.component.css']

})
export class PolicememberComponent {

  myVariable: string='';
  data$: Observable<any> | undefined;
  data: any;

  public policeOfficerName :string   ;
  policeOfficerPhone :string   ;
  policeOfficerDis :string    ;
  dataList: any[] = [];

  names: string[] = [];
  profileImageUrls: string[] = [];
  phones: string[] = [];
  cars: string[] = [];
  uid:string[] =[];
  drivers: any[] = [];


  driver: { name: any; profileImageUrl: any; phone: any; car: any; };


constructor( public db: AngularFireDatabase){
  this.policeOfficerName = '';
  this.policeOfficerPhone = '';
  this.policeOfficerDis = '';
  this.driver = {
    name: 'John',
    profileImageUrl: 'https://example.com/profile.png',
    phone: '+123456789',
    car: 'Toyota'
  };


  this.getUserData();
}



  getUserData(){

       this.db.list('Messages', ref => ref.orderByKey().startAt("Nittambuwa"))
        .snapshotChanges()
        .subscribe((snapshots) => {
          snapshots.forEach((snapshot) => {
            const object = snapshot.payload.val();
            const messageOfficerpath = snapshot.key;


            if(messageOfficerpath?.includes("Nitt") && messageOfficerpath != null){

              const objectRef: AngularFireObject<any> = this.db.object('Users/Driver/' + messageOfficerpath);
                          this.data$ = objectRef.valueChanges();
                          this.data$.subscribe(data => {

                            const driver = {
                              name: data.name,
                              profileImageUrl: data.profileImageUrl,
                              phone: data.phone,
                              car: data.car,
                              uid:messageOfficerpath

                            };
                            this.drivers.push(driver);



                          });

             }

          });
        });

   }

//    passPoliceOfficerInfo(officerName:string, officerPhone:string , officerDiscription:string) {
//     this.policeOfficerName = officerName;
//     this.policeOfficerPhone = officerPhone;
//     this.policeOfficerDis = officerDiscription;
//     console.log(this.policeOfficerName + "  " + this.policeOfficerPhone + " " + this.policeOfficerDis)

//  }


}
