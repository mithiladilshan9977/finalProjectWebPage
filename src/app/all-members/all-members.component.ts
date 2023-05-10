import { Component } from '@angular/core';
import { AngularFireDatabase,AngularFireObject  } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ref } from 'firebase/database';
import { error } from 'console';
@Component({
  selector: 'app-all-members',
  templateUrl: './all-members.component.html',
  styleUrls: ['./all-members.component.css']
})
export class AllMembersComponent {

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
  chekingData:boolean = false;

  filteredOfficers: any[] = [];
  searchTerm: string = '';
  stationName:string[] =[];


  drivers: any[] = [];
  officerInfoArray: any[] = [];
  
  driver: { name: any; profileImageUrl: any; phone: any; car: any; };
  isLoading:boolean = false;
  checkTheUserAvaiableSearch:boolean = false;


  constructor( public db: AngularFireDatabase,public afAuth: AngularFireAuth){

    this.policeOfficerName = '';
    this.policeOfficerPhone = '';
    this.policeOfficerDis = '';

    this.driver = {
      name: 'John',
      profileImageUrl: 'https://example.com/profile.png',
      phone: '+123456789',
      car: 'Toyota'
    };


 
  this.getAllMembersData();


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


  getAllMembersData(){
    //tacking oic station path
    this.afAuth.authState.subscribe((user) =>{
     if(user){
     

                       this.db.list('HeadPolice/',ref => ref.orderByKey().startAt(user.uid).endAt(user.uid)).snapshotChanges().subscribe((snapshots) =>{
                        snapshots.forEach((snapshot)=>{
                          const object = snapshot.payload.val();
                           const OfficerInfoPath = snapshot.key;
                        
                               if(OfficerInfoPath !=null){
                                const objectRef: AngularFireObject<any> = this.db.object('HeadPolice/' + OfficerInfoPath);
                                    this.OICdata$ = objectRef.valueChanges();
                                    this.OICdata$.subscribe(data => {
                                      this.isLoading = false;


                                      const driver = {
                                        stationName: data.policesationname,
                                        

                                      };
                                      this.officerInfoArray.push(driver);
                                      const place = this.officerInfoArray[0].stationName ;
                              
                                     

                                                   
                                       
                                      
                                      this.isLoading = true;
                                  
                               

                                      this.db.list('Users/Driver',ref => ref.orderByKey().startAt(place).endAt(place+ '\uf8ff')).snapshotChanges().subscribe((snapshots) =>{
                                       snapshots.forEach((snapshot)=>{
                                       
                            

                                             if(snapshots.length ==0){
                                               this.isLoading = false;
                                               this.chekingData = true;
                                            
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


                                                //ednedn
                                    });

                                    }




                           //end
                        }) 
                       })
     }
    });

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
