import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericGlobeComponent } from './generic-globe.component';

describe('GenericGlobeComponent', () => {
  let component: GenericGlobeComponent;
  let fixture: ComponentFixture<GenericGlobeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericGlobeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericGlobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
