import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamrosterComponent } from './teamroster.component';

describe('TeamrosterComponent', () => {
  let component: TeamrosterComponent;
  let fixture: ComponentFixture<TeamrosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamrosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamrosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
