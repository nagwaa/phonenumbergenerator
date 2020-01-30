import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ApiRequestService } from '../../services/api-request.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css']
})
export class PhoneNumberComponent implements OnInit, OnDestroy {

  phoneNumberCombinations: string[] = [];

  currentPageData: string[] = [];

  pageSize = 25;

  // Zero based index
  pageStart: number;

  // One based index
  pageEnd: number;

  subscription: Subscription;

  constructor(private apiRequest: ApiRequestService) { }

  ngOnInit() {
  }

  fetchCombinations(formVal: any) {
    this.phoneNumberCombinations = [];
    this.currentPageData = [];
    if (formVal.phoneNumber) {
      this.phoneNumberCombinations = [];
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = this.apiRequest.getPhoneNumberCombinations(formVal.phoneNumber).subscribe(combinations => {
        this.phoneNumberCombinations = combinations;
        this.initPagination();
      });
    }
  }

  initPagination() {
    if (!this.phoneNumberCombinations || this.phoneNumberCombinations.length === 0) {
      return;
    }
    this.pageStart = 0;
    this.pageEnd = this.isPagingEnabled() ? this.pageSize : this.phoneNumberCombinations.length;
    this.currentPageData = this.phoneNumberCombinations.slice(this.pageStart, this.pageEnd);
  }

  isPagingEnabled(): boolean {
    return this.phoneNumberCombinations.length > this.pageSize;
  }

  nextPage(): void {
    if (this.hasNext()) {
      this.pageStart = this.pageEnd;
      const newPageEnd: number = this.pageEnd + this.pageSize;
      this.pageEnd = newPageEnd > this.phoneNumberCombinations.length ? this.phoneNumberCombinations.length : newPageEnd;
      this.currentPageData = this.phoneNumberCombinations.slice(this.pageStart, this.pageEnd);
    }
  }

  previousPage(): void {
    if (this.hasPrevious()) {
      this.pageEnd = this.pageStart;
      this.pageStart -= this.pageSize;
      this.currentPageData = this.phoneNumberCombinations.slice(this.pageStart, this.pageEnd);
    }
  }

  hasNext(): boolean {
    return this.pageEnd < this.phoneNumberCombinations.length;
  }

  hasPrevious(): boolean {
    return this.pageStart !== 0;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
