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
  policeID: string[] = [];
  NICnumber: string[] = [];
  officerDataPath: string[] = [];
  status: string[] = [];





  drivers: any[] = [];
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


  }
  getUserData(){

    this.isLoading = true;
         this.db.list('Users/Driver',ref => ref.orderByKey().startAt('Nitt')).snapshotChanges().subscribe((snapshots) =>{
          snapshots.forEach((snapshot)=>{

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


            console.log(this.drivers);

            });



           }


          })
         })
  }



  giveThePermission(updatePath : string){


 const objectRef: AngularFireObject<any> = this.db.object(updatePath);

 confirm('Do you want to proceed?') && objectRef.update({ status: "registered" })
    .then(() => console.log('Node property updated successfully!'))
    .catch((error) => console.log('Error updating node property: ', error));



  }

}
