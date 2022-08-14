import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsTestingComponent } from './stats-testing.component';

describe('StatsTestingComponent', () => {
  let component: StatsTestingComponent;
  let fixture: ComponentFixture<StatsTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsTestingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
