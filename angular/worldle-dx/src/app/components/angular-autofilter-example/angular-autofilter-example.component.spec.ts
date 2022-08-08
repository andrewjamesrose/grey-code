import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularAutofilterExampleComponent } from './angular-autofilter-example.component';

describe('AngularAutofilterExampleComponent', () => {
  let component: AngularAutofilterExampleComponent;
  let fixture: ComponentFixture<AngularAutofilterExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularAutofilterExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularAutofilterExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
