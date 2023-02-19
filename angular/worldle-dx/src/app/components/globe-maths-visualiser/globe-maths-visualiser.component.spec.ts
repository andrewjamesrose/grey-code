import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreGlobeTestsComponent } from './globe-maths-visualiser.component';

describe('MoreGlobeTestsComponent', () => {
  let component: MoreGlobeTestsComponent;
  let fixture: ComponentFixture<MoreGlobeTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreGlobeTestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreGlobeTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
