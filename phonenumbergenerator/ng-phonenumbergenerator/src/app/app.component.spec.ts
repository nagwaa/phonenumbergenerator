import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PhoneNumberComponent } from './components/phone-number/phone-number.component';
import { ApiRequestService, StubApiRequestService } from 'src/app/services/api-request.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PhoneNumberComponent
      ],
      imports: [FormsModule],
      providers: [
        { provide: ApiRequestService, useClass: StubApiRequestService}
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
