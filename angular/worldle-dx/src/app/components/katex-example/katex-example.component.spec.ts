import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatexExampleComponent } from './katex-example.component';

describe('KatexExampleComponent', () => {
  let component: KatexExampleComponent;
  let fixture: ComponentFixture<KatexExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KatexExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KatexExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
