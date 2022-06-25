import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendHttpTestComponent } from './backend-http-test.component';

describe('BackendHttpTestComponent', () => {
  let component: BackendHttpTestComponent;
  let fixture: ComponentFixture<BackendHttpTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendHttpTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendHttpTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
