import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamescoreLineChartComponent } from './gamescore-line-chart.component';

describe('GamescoreLineChartComponent', () => {
  let component: GamescoreLineChartComponent;
  let fixture: ComponentFixture<GamescoreLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamescoreLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamescoreLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
