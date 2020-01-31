import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiRequestService } from './api-request.service';

describe('ApiRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ApiRequestService = TestBed.get(ApiRequestService);
    expect(service).toBeTruthy();
  });
});
