import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { PhoneNumberComponent } from './phone-number.component';
import { ApiRequestService, StubApiRequestService } from 'src/app/services/api-request.service';

describe('PhoneNumberComponent', () => {
  let component: PhoneNumberComponent;
  let fixture: ComponentFixture<PhoneNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhoneNumberComponent],
      imports: [FormsModule],
      providers: [
        { provide: ApiRequestService, useClass: StubApiRequestService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initPagination initializes start and end indexes with updating display data', () => {
    component.phoneNumberCombinations = ['123', '1A3', '12D', '1BE'];
    component.pageSize = 2;
    component.initPagination();
    expect(component.pageStart).toBe(0);
    expect(component.pageEnd).toBe(2);
    expect(component.currentPageData).toEqual(['123', '1A3']);
  });

  it('isPagingEnabled', () => {
    component.pageSize = 5;
    component.phoneNumberCombinations = new Array(5).fill('111');
    expect(component.isPagingEnabled()).toBeFalsy();
    component.phoneNumberCombinations = new Array(4).fill('111');
    expect(component.isPagingEnabled()).toBeFalsy();
    component.phoneNumberCombinations = new Array(6).fill('111');
    expect(component.isPagingEnabled()).toBeTruthy();
  });

  it('test nextPage emits sliced data data based on start and end index', () => {
    component.phoneNumberCombinations = ['123', '1A3', '12D', '1BE'];
    component.pageStart = 0;
    component.pageEnd = 2;
    component.pageSize = 2;
    component.nextPage();
    expect(component.currentPageData).toEqual(['12D', '1BE']);
    expect(component.pageStart).toBe(2);
    expect(component.pageEnd).toBe(4);
  });

  it('test previousPage emits sliced data data based on start and end index', () => {
    component.phoneNumberCombinations = ['123', '1A3', '12D', '1BE'];
    component.pageStart = 2;
    component.pageEnd = 4;
    component.pageSize = 2;
    component.previousPage();
    expect(component.currentPageData).toEqual(['123', '1A3']);
    expect(component.pageStart).toBe(0);
    expect(component.pageEnd).toBe(2);
  });

  it('test previousPage() method doesn\'t decrement when lower limit reached', () => {
    component.phoneNumberCombinations = new Array(20).fill('123');
    component.pageStart = 0;
    component.pageEnd = 19;
    component.pageSize = 20;
    component.previousPage();
    expect(component.pageStart).toBe(0);
    expect(component.pageEnd).toBe(19);
  });

  it('test nextPage() method doesn\'t increment when upper limit reached', () => {
    component.phoneNumberCombinations = new Array(20).fill('123');
    component.pageStart = 10;
    component.pageEnd = 20;
    component.pageSize = 10;
    component.nextPage();
    expect(component.pageStart).toBe(10);
    expect(component.pageEnd).toBe(20);
  });

  it('hasNext() method returns appropriate values', () => {
    component.pageEnd = 49;
    component.phoneNumberCombinations = new Array(50).fill('123');
    expect(component.hasNext()).toBeTruthy();
    component.pageEnd = 50;
    expect(component.hasNext()).toBeFalsy();
  });

  it('hasPrevious() method returns appropriate values', () => {
    component.pageStart = 1;
    component.phoneNumberCombinations = new Array(2).fill('123');
    expect(component.hasPrevious()).toBeTruthy();
    component.pageStart = 0;
    expect(component.hasPrevious()).toBeFalsy();
  });
});
