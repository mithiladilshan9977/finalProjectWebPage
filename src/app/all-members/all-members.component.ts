import { Component } from '@angular/core';
import { AngularFireDatabase,AngularFireObject  } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-members',
  templateUrl: './all-members.component.html',
  styleUrls: ['./all-members.component.css']
})
export class AllMembersComponent {

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
         this.db.list('Users/Driver',ref => ref.orderByKey().startAt('Nitt')).snapshotChanges().subscribe((snapshots) =>{
          snapshots.forEach((snapshot)=>{

            const object = snapshot.payload.val();
            const offiverInformationPath = snapshot.key;

           if(offiverInformationPath?.includes("Nitt") && offiverInformationPath != null){

            const objectRef: AngularFireObject<any> = this.db.object('Users/Driver/' + offiverInformationPath);
            this.data$ = objectRef.valueChanges();
            this.data$.subscribe(data => {

              const driver = {
                name: data.name,
                profileImageUrl: data.profileImageUrl,
                phone: data.phone,
                car: data.car

              };
              this.drivers.push(driver);

            console.log(this.drivers);

            });



           }


          })
         })
  }





}
