import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripLoggerEditComponent } from './trip-logger-edit.component';

describe('TripLoggerEditComponent', () => {
  let component: TripLoggerEditComponent;
  let fixture: ComponentFixture<TripLoggerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripLoggerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripLoggerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
