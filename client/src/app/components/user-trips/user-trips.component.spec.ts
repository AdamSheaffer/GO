import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTripsComponent } from './user-trips.component';

describe('UserTripsComponent', () => {
  let component: UserTripsComponent;
  let fixture: ComponentFixture<UserTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
