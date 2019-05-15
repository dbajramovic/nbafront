import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulativestatsComponent } from './cumulativestats.component';

describe('CumulativestatsComponent', () => {
  let component: CumulativestatsComponent;
  let fixture: ComponentFixture<CumulativestatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CumulativestatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CumulativestatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
