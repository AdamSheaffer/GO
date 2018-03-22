import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkDetailsHomeComponent } from './park-details-home.component';

describe('ParkDetailsHomeComponent', () => {
  let component: ParkDetailsHomeComponent;
  let fixture: ComponentFixture<ParkDetailsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkDetailsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkDetailsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
