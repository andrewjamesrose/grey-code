import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpViaServiceComponent } from './http-via-service.component';

describe('HttpViaServiceComponent', () => {
  let component: HttpViaServiceComponent;
  let fixture: ComponentFixture<HttpViaServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpViaServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpViaServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
