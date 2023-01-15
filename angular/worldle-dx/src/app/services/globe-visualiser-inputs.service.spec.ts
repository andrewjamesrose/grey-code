import { TestBed } from '@angular/core/testing';

import { GlobeVisualiserInputsService } from './globe-visualiser-inputs.service';

describe('GlobeVisualiserInputsService', () => {
  let service: GlobeVisualiserInputsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobeVisualiserInputsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
