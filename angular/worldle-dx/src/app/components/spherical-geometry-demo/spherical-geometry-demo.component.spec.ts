import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SphericalGeometryDemoComponent } from './spherical-geometry-demo.component';

describe('SphericalGeometryDemoComponent', () => {
  let component: SphericalGeometryDemoComponent;
  let fixture: ComponentFixture<SphericalGeometryDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SphericalGeometryDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SphericalGeometryDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
