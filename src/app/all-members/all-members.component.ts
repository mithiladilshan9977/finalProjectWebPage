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
  chekingData:boolean = false;

  filteredOfficers: any[] = [];
  searchTerm: string = '';

  drivers: any[] = [];
  driver: { name: any; profileImageUrl: any; phone: any; car: any; };
  isLoading:boolean = false;
  checkTheUserAvaiableSearch:boolean = false;


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

  filterOfficers() {

    if(this.searchTerm.trim() ===""){}


    this.filteredOfficers = this.drivers.filter(driver => {
      return driver.name.includes(this.searchTerm)||
      driver.policeID.includes(this.searchTerm) ||
      driver.NICnumber.includes(this.searchTerm)


    });

    if(this.filteredOfficers.length ===0){
this.checkTheUserAvaiableSearch = true;
    }else{
      this.checkTheUserAvaiableSearch = false;
    }




  }


  getUserData(){

    this.isLoading = true;
         this.db.list('Users/Driver',ref => ref.orderByKey().startAt('Nitt')).snapshotChanges().subscribe((snapshots) =>{
          snapshots.forEach((snapshot)=>{
                if(snapshots.length ==0){
                  this.isLoading = false;
                  this.chekingData = true;
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



  giveThePermission(updatePath : string){

 const objectRef: AngularFireObject<any> = this.db.object(updatePath);

 confirm('Do you want to proceed?') && objectRef.update({ status: "registered" })
    .then(() => console.log('Node property updated successfully!'))

  }
  removeOfficer(removePath : string){

    const objectRef: AngularFireObject<any> = this.db.object(removePath);

 confirm('Do you want to remove?') && objectRef.update({ status: "unregistered" })
    .then(() => console.log('Node property updated successfully!'))
  }

}
