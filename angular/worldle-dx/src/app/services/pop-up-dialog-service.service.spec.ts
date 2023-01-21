import { TestBed } from '@angular/core/testing';

import { PopUpDialogServiceService } from './pop-up-dialog-service.service';

describe('PopUpDialogServiceService', () => {
  let service: PopUpDialogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpDialogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
