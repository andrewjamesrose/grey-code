import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcTestComponent } from './calc-test.component';

describe('CalcTestComponent', () => {
  let component: CalcTestComponent;
  let fixture: ComponentFixture<CalcTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
