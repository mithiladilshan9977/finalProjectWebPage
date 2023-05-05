import { Component, OnInit } from '@angular/core';
import { GetDataServiceService } from '../services/get-data-service.service';

@Component({
  selector: 'app-policemember',
  templateUrl: './policemember.component.html',
  styleUrls: ['./policemember.component.css']

})
export class PolicememberComponent implements OnInit{

 

constructor(public getdataservice : GetDataServiceService){}

  ngOnInit(): void {

    this.getdataservice.getUserData();

    throw new Error('Method not implemented.');
  }

}
