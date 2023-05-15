import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFireDatabase,AngularFireObject  } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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

  OICInfo: any[] = [];
  OICdata$: Observable<any> | undefined;
  OICdata: any;

  driver: { name: any; profileImageUrl: any; phone: any; car: any; };
  isLoading:boolean = false;
  chekcingData:boolean = false;

constructor( public db: AngularFireDatabase ,public afAuth: AngularFireAuth){
  this.policeOfficerName = '';
  this.policeOfficerPhone = '';
  this.policeOfficerDis = '';
  this.driver = {
    name: 'John',
    profileImageUrl: 'https://example.com/profile.png',
    phone: '+123456789',
    car: 'Toyota'
  };


  // this.getUserData();
  this.getOICStationLocation();
}

getOICStationLocation(){
  this.afAuth.authState.subscribe((user) =>{
    if(user){

       this.db.list("HeadPolice/" , ref => ref.orderByKey().startAt(user.uid).endAt(user.uid)).snapshotChanges().subscribe((snapshots) =>{
        snapshots.forEach((snapshot) =>{
          const object = snapshot.payload.val();
          const OICpath = snapshot.key;

             if(OICpath !=null){


              const objectRef: AngularFireObject<any> = this.db.object('HeadPolice/' + OICpath);
              this.OICdata$ = objectRef.valueChanges();
              this.OICdata$.subscribe(data => {
                   const driver = {
                  stationName: data.policesationname,


                };
                this.OICInfo.push(driver);
                const place = this.OICInfo[0].stationName ;

                this.isLoading = true;
                this.db.list("Messages/" , ref=>ref.orderByKey().startAt(place).endAt(place + '\uf8ff')).snapshotChanges().subscribe((snapshots) =>{
                  snapshots.forEach((snapshot) =>{
                    if(snapshots.length ==0){
                      this.isLoading = false;
                      this.chekcingData = true;
                    }
                    const object = snapshot.payload.val();
                    const messageOfficerpath = snapshot.key;
                     if(messageOfficerpath?.includes(place) && messageOfficerpath != null){

                      const objectRef: AngularFireObject<any> = this.db.object('Users/Driver/' + messageOfficerpath);
                      this.data$ = objectRef.valueChanges();
                      this.data$.subscribe(data => {


                        this.isLoading = false;

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

                  })
                })

                //end

              });




             }
        })
       })
    }
});
}



//    passPoliceOfficerInfo(officerName:string, officerPhone:string , officerDiscription:string) {
//     this.policeOfficerName = officerName;
//     this.policeOfficerPhone = officerPhone;
//     this.policeOfficerDis = officerDiscription;
//     console.log(this.policeOfficerName + "  " + this.policeOfficerPhone + " " + this.policeOfficerDis)

//  }


}
