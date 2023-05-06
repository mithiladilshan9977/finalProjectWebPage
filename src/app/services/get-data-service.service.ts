import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireObject  } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})


export class GetDataServiceService implements OnInit {

  data$: Observable<any> | undefined;
  data: any;
  public policeOfficerName :string   ;
  policeOfficerPhone :string   ;
  policeOfficerDis :string    ;

  namevale:string = this.getName();


  constructor(public db: AngularFireDatabase) {
       this.policeOfficerName = '';
       this.policeOfficerPhone = '';
       this.policeOfficerDis = '';

  }
  ngOnInit(): void {

}

 getUserData(){

  this.db.list('Messages', ref => ref.orderByKey().startAt("Nittambuwa"))
      .snapshotChanges()
      .subscribe((snapshots) => {
        snapshots.forEach((snapshot) => {
          const object = snapshot.payload.val();
          const messageOfficerpath = snapshot.key;


          if(messageOfficerpath != null){

            const objectRef: AngularFireObject<any> = this.db.object('Users/Driver/' + messageOfficerpath);
                        this.data$ = objectRef.valueChanges();
                        this.data$.subscribe(data => {
                          this.data = data;

                           this.passPoliceOfficerInfo(data.name, data.phone, data.car);

                        });
           }

        });
      });

 }

 passPoliceOfficerInfo(officerName:string, officerPhone:string , officerDiscription:string) {
    this.policeOfficerName = officerName;

    this.policeOfficerPhone = officerPhone;
    this.policeOfficerDis = officerDiscription;

 }
  getName():string {
  return this.policeOfficerName  + " sky"  ;
 }
 showname(){
  console.log(this.namevale )
 }


}






// const objectRef = this.db.object('Messages/Nittambuwac8HbfymlSsVRsZ1cADzvjNYCZeG2');
  // objectRef.snapshotChanges().subscribe(snapshot => {
  //   console.log(snapshot.key + "dwadawd");
  // });


  // this.db.list('Messages', ref => ref.orderByKey().startAt('Nittambuwa'))
  // .valueChanges()
  // .subscribe((policeNameWithStartText) => {
  //   console.log(policeNameWithStartText  + "aadwe");

//here can take path
//       const objectRef = this.db.object('Messages/Nittambuwac8HbfymlSsVRsZ1cADzvjNYCZeG2');
//   objectRef.snapshotChanges().subscribe(snapshot => {
//     console.log(snapshot.key + "path");
//   });



//   });


  // const objectRef: AngularFireObject<any> = this.db.object('Messages/Nittambuwac8HbfymlSsVRsZ1cADzvjNYCZeG2/text');
  //   this.data$ = objectRef.valueChanges();
  //   this.data$.subscribe(data => {
  //     this.data = data;
  //    console.log(data)

  //   });


//   this.db.list('Users/Customer/LxTOMdh9AeUUNRdtHEqSxqlt9Pu1').valueChanges().subscribe((users) => {
//     console.log(users.indexOf['name']+ "user details");

//   throw new Error('Method not implemented.');
// });








//access user info below




 //console.log(`Path:${path}    , Object: ${JSON.stringify(object)}`);

            // if(path != null){

            //  this.db.list('Messages/'+path+'/text',ref =>ref.orderByKey().startAt("-")).snapshotChanges().subscribe((spanshotssecond) =>{
            //   spanshotssecond.forEach((snapshot) =>{
            //   const object = snapshot.payload.val();
            //   const pathsecond = snapshot.key;

            //                   if(pathsecond != null){

                                // const objectRef: AngularFireObject<any> = this.db.object('Messages/'+path+'/text/'+ pathsecond);
                                // this.data$ = objectRef.valueChanges();
                                // this.data$.subscribe(data => {
                                //   this.data = data;
                                //  console.log(data.message)

                                // });

            //                   }




            //  });

            //  });


            //   this.db.list('Messages/'+path+'/text').valueChanges().subscribe((users) => {
            //     console.log(`Object: ${JSON.stringify(users)}`);});
            // }
