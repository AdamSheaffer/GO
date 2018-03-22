import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkDetailsSidebarComponent } from './park-details-sidebar.component';

describe('ParkDetailsSidebarComponent', () => {
  let component: ParkDetailsSidebarComponent;
  let fixture: ComponentFixture<ParkDetailsSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkDetailsSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkDetailsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
