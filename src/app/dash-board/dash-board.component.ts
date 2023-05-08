import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireObject  } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent  {
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
  policeID: string[] = [];
  NICnumber: string[] = [];
  officerDataPath: string[] = [];
  status: string[] = [];




  drivers: any[] = [];
  driverssecond: any[] = [];

  driver: { name: any; profileImageUrl: any; phone: any; car: any; };
  isLoading:boolean = false;

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
  this.getNumberOfComplains();



  }
  getUserData(){

    this.isLoading = true;
         this.db.list('Users/Driver',ref => ref.orderByKey().startAt('Nitt')).snapshotChanges().subscribe((snapshots) =>{
          snapshots.forEach((snapshot)=>{
                if(snapshots.length ==0){
                  this.isLoading = false;

                }
            const object = snapshot.payload.val();
            const offiverInformationPath = snapshot.key;

           if(offiverInformationPath?.includes("Nitt") && offiverInformationPath != null){

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
  }


  getNumberOfComplains(){

    this.isLoading = true;
    this.db.list('Messages', ref => ref.orderByKey().startAt("Nittambuwa"))
     .snapshotChanges()
     .subscribe((snapshots) => {
        if(snapshots.length == 0){
         this.isLoading = false;

        }

       snapshots.forEach((snapshot) => {
         const object = snapshot.payload.val();
         const messageOfficerpath = snapshot.key;


         if(messageOfficerpath?.includes("Nitt") && messageOfficerpath != null){

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


  }

}
