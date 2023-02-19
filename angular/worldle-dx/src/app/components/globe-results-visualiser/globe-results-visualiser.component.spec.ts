import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobeResultsVisualiserComponent } from './globe-results-visualiser.component';

describe('GlobeResultsVisualiserComponent', () => {
  let component: GlobeResultsVisualiserComponent;
  let fixture: ComponentFixture<GlobeResultsVisualiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobeResultsVisualiserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobeResultsVisualiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
