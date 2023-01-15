import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobeControlsComponent } from './globe-controls.component';

describe('GlobeControlsComponent', () => {
  let component: GlobeControlsComponent;
  let fixture: ComponentFixture<GlobeControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobeControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobeControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
