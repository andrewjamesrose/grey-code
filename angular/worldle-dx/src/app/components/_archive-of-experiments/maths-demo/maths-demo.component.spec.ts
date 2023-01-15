import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathsDemoComponent } from './maths-demo.component';

describe('MathsDemoComponent', () => {
  let component: MathsDemoComponent;
  let fixture: ComponentFixture<MathsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MathsDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MathsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
