import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamepriceComponent } from './gameprice.component';

describe('GamepriceComponent', () => {
  let component: GamepriceComponent;
  let fixture: ComponentFixture<GamepriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamepriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamepriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
