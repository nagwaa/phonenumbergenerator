import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../services/api-request.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css']
})
export class PhoneNumberComponent implements OnInit {

  phoneNumber: number;

  phoneNumberCombinations: number[] = []

  subscription: Subscription;

  constructor(private apiRequest: ApiRequestService) { }

  ngOnInit() {
  }

  fetchCombinations(){
    if(this.phoneNumber){
      this.phoneNumberCombinations = [];
      if(this.subscription){
        this.subscription.unsubscribe();
      }
      this.subscription = this.apiRequest.getPhoneNumberCombinations(this.phoneNumber).subscribe( combinations => {
        this.phoneNumberCombinations = combinations;
      });
    }
  }

  ngOnDestroy(){
    if(this.subscription){
        this.subscription.unsubscribe();
      }
  }

}
