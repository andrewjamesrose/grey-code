import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipboardIoComponent } from './clipboard-io.component';

describe('ClipboardIoComponent', () => {
  let component: ClipboardIoComponent;
  let fixture: ComponentFixture<ClipboardIoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClipboardIoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipboardIoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
