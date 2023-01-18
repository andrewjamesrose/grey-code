import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameClueComponent } from './game-clue.component';

describe('GameClueComponent', () => {
  let component: GameClueComponent;
  let fixture: ComponentFixture<GameClueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameClueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameClueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
