import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTripsTeamsComponent } from './user-trips-teams.component';

describe('UserTripsTeamsComponent', () => {
  let component: UserTripsTeamsComponent;
  let fixture: ComponentFixture<UserTripsTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTripsTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTripsTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
