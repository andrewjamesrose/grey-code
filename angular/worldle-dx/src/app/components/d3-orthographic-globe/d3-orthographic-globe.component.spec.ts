import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3OrthographicGlobeComponent } from './d3-orthographic-globe.component';

describe('D3OrthographicGlobeComponent', () => {
  let component: D3OrthographicGlobeComponent;
  let fixture: ComponentFixture<D3OrthographicGlobeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3OrthographicGlobeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3OrthographicGlobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
