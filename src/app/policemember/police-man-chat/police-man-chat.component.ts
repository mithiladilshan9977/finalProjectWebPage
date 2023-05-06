import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase,AngularFireObject  } from '@angular/fire/compat/database';

@Component({
  selector: 'app-police-man-chat',
  templateUrl: './police-man-chat.component.html',
  styleUrls: ['./police-man-chat.component.css']
})
export class PoliceManChatComponent implements OnInit {

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



  officerUid: string;
  officerName: string;



  constructor(private route: ActivatedRoute,public db: AngularFireDatabase) {
    this.officerUid = '';
    this.officerName = '';

   this.policeOfficerName = '';
  this.policeOfficerPhone = '';
  this.policeOfficerDis = '';

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this.officerUid = params['officeruid'] ;
      this.officerName = params['officername'] ;
      this.gettingOfficerChatInfo();
    })
    throw new Error('Method not implemented.');
  }



  gettingOfficerChatInfo(){

    this.db.list('Messages/'+this.officerUid+'/text', ref => ref.orderByKey().startAt(" "))
    .snapshotChanges()
    .subscribe((snapshots) => {
      snapshots.forEach((snapshot) => {
        const object = snapshot.payload.val();
        const getMessageTextpath = snapshot.key;


        if( getMessageTextpath != null){

          const objectRef: AngularFireObject<any> = this.db.object('Messages/'+this.officerUid+'/text/' + getMessageTextpath);
          this.data$ = objectRef.valueChanges();
          this.data$.subscribe(data => {

            const driver = {
              messageDate: data.dateTime,
              meesageText: data.message,



            };
            this.drivers.push(driver);
            console.log(driver);


          });


         }

      });
    });

  }
}
