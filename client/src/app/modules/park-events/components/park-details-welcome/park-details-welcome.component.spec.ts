import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkDetailsWelcomeComponent } from './park-details-welcome.component';

describe('ParkDetailsWelcomeComponent', () => {
  let component: ParkDetailsWelcomeComponent;
  let fixture: ComponentFixture<ParkDetailsWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkDetailsWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkDetailsWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
