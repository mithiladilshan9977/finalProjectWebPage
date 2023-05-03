import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { getDatabase, ref, onValue} from "firebase/database";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  isOpen: boolean = false;
  @Output() isLogout = new EventEmitter<void>()

  constructor(public firebaseService: FirebaseService){}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  Logout(){
   this.firebaseService.logout()
   this.isLogout.emit()
  }


  toggleMenu() {
    this.isOpen = !this.isOpen;
  }




}
