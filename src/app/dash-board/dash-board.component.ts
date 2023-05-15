import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireObject  } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getDatabase } from 'firebase/database';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent  {
  myVariable: string='';
  data$: Observable<any> | undefined;
  data: any;

  OICdata$: Observable<any> | undefined;
  OICdata: any;

  public policeOfficerName :string   ;
  policeOfficerPhone :string   ;
  policeOfficerDis :string    ;
  dataList: any[] = [];

  names: string[] = [];
  profileImageUrls: string[] = [];
  phones: string[] = [];
  cars: string[] = [];
  policeID: string[] = [];
  NICnumber: string[] = [];
  officerDataPath: string[] = [];
  status: string[] = [];
  stationName:string[] =[];
  stationTextName:string ;


  drivers: any[] = [];
  OICInfo: any[] = [];
  driverssecond: any[] = [];

  driver: { name: any; profileImageUrl: any; phone: any; car: any; };
  isLoading:boolean = false;
  uid: string  ;

  user$: Observable<any> | undefined;

  constructor( public db: AngularFireDatabase,public afAuth: AngularFireAuth ){

    this.policeOfficerName = '';
    this.policeOfficerPhone = '';
    this.policeOfficerDis = '';
    this.uid = '';
    this.stationTextName = '';
    this.driver = {
      name: 'John',
      profileImageUrl: 'https://example.com/profile.png',
      phone: '+123456789',
      car: 'Toyota'
    };


    this.getOICStationLocation();



  }

  getOICStationLocation(){
    //tacking oic station path
    this.afAuth.authState.subscribe((user) =>{
     if(user){



      this.db.list('HeadPolice/',ref => ref.orderByKey().startAt(user.uid).endAt(user.uid)).snapshotChanges().subscribe((snapshots) =>{
   snapshots.forEach((snapshot)=>{

         const object = snapshot.payload.val();
         const OICpath = snapshot.key;

          if(OICpath != null){
            const objectRef: AngularFireObject<any> = this.db.object('HeadPolice/' + OICpath);
            this.OICdata$ = objectRef.valueChanges();
            this.OICdata$.subscribe(data => {
                 const driver = {
                stationName: data.policesationname,


              };
              this.OICInfo.push(driver);
              const place = this.OICInfo[0].stationName ;


                                        this.isLoading = true;
                                        this.db.list('Users/Driver',ref => ref.orderByKey().startAt(place).endAt(place + '\uf8ff')).snapshotChanges().subscribe((snapshots) =>{
                                        snapshots.forEach((snapshot)=>{
                                              if(snapshots.length ==0){
                                                this.isLoading = false;

                                              }
                                          const object = snapshot.payload.val();
                                          const offiverInformationPath = snapshot.key;

                                          if(offiverInformationPath?.includes(place) && offiverInformationPath != null){

                                          const objectRef: AngularFireObject<any> = this.db.object('Users/Driver/' + offiverInformationPath);
                                          this.data$ = objectRef.valueChanges();
                                          this.data$.subscribe(data => {
                                            this.isLoading = false;


                                            const driver = {
                                              name: data.name,
                                              profileImageUrl: data.profileImageUrl,
                                              phone: data.phone,
                                              car: data.car,
                                              policeID:data.policeIDNumber,
                                              NICnumber:data.NICNumber,
                                              status:data.status,
                                              officerDataPath:"Users/Driver/"+offiverInformationPath

                                            };
                                            this.drivers.push(driver);


                                          });



                                          }


                                        })
                                        })





                                        this.isLoading = true;
                                        this.db.list('Messages', ref => ref.orderByKey().startAt(place).endAt(place))
                                         .snapshotChanges()
                                         .subscribe((snapshots) => {
                                            if(snapshots.length == 0){
                                             this.isLoading = false;

                                            }

                                           snapshots.forEach((snapshot) => {
                                             const object = snapshot.payload.val();
                                             const messageOfficerpath = snapshot.key;


                                             if(messageOfficerpath?.includes(place) && messageOfficerpath != null){

                                               const objectRef: AngularFireObject<any> = this.db.object('Users/Driver/' + messageOfficerpath);
                                                           this.data$ = objectRef.valueChanges();
                                                           this.data$.subscribe(data => {


                                                             const drivernew = {
                                                               name: data.name,
                                                               profileImageUrl: data.profileImageUrl,
                                                               phone: data.phone,
                                                               car: data.car,
                                                               uid:messageOfficerpath

                                                             };
                                                             this.driverssecond.push(drivernew);



                                                           });

                                              }

                                           });
                                         });











              //end

            });


          }




       })

      })

     }
   });

  }






}
