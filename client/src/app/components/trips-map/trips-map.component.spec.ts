import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsMapComponent } from './trips-map.component';

describe('TripsMapComponent', () => {
  let component: TripsMapComponent;
  let fixture: ComponentFixture<TripsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
