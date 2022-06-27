import { TestBed } from '@angular/core/testing';

import { BackendTestServiceService } from './backend-test-service.service';

describe('BackendTestServiceService', () => {
  let service: BackendTestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendTestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
