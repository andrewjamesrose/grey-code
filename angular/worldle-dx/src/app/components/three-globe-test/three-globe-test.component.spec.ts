import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeGlobeTestComponent } from './three-globe-test.component';

describe('ThreeGlobeTestComponent', () => {
  let component: ThreeGlobeTestComponent;
  let fixture: ComponentFixture<ThreeGlobeTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeGlobeTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeGlobeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
