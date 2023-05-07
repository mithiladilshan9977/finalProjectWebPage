import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase,AngularFireObject  } from '@angular/fire/compat/database';
@Component({
  selector: 'app-police-man-chat-image',
  templateUrl: './police-man-chat-image.component.html',
  styleUrls: ['./police-man-chat-image.component.css']
})
export class PoliceManChatImageComponent implements OnInit{

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

  isLarge:boolean  = false;
  isLoading:boolean = false;




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
      this.gettingOfficerImages();
    })
    throw new Error('Method not implemented.');
  }


  gettingOfficerImages(){
    this.isLoading = false;

    this.db.list('Messages/'+this.officerUid+'/image', ref => ref.orderByKey().startAt(" "))
    .snapshotChanges()
    .subscribe((snapshots) => {
      snapshots.forEach((snapshot) => {
        const object = snapshot.payload.val();
        const getMessageImagepath = snapshot.key;



        if( getMessageImagepath != null){

          const objectRef: AngularFireObject<any> = this.db.object('Messages/'+this.officerUid+'/image/' + getMessageImagepath);
          this.data$ = objectRef.valueChanges();
          this.data$.subscribe(data => {



            const officerImages = {
              imageMessage: data.mProfile

            };
            this.drivers.push(officerImages);


          });


         }else{
          console.log("not");
         }

      });
    });

  }

  toggleImageSize(){
    this.isLarge = !this.isLarge;
  }


}
