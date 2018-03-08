import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripLoggerComponent } from './trip-logger.component';

describe('TripLoggerComponent', () => {
  let component: TripLoggerComponent;
  let fixture: ComponentFixture<TripLoggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripLoggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
