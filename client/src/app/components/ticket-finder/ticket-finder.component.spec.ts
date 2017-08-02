import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketFinderComponent } from './ticket-finder.component';

describe('TicketFinderComponent', () => {
  let component: TicketFinderComponent;
  let fixture: ComponentFixture<TicketFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
