import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Event } from '../../shared/event.model';
import { TicketQuery } from '../../shared/ticket-query.model';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  @Input() events: Event[];
  @Input() queryParams: TicketQuery;
  @Input() meta;
  @Input() expandAll: boolean;
  @Output() onQueryChange = new EventEmitter<void>();
  @Output() onEventTicketSelect = new EventEmitter<Event>();

  sortingBy = 'datetime_local';
  sortingDirection = 'asc';
  caret = 'caret down';
  perPage = 10;

  constructor() { }

  ngOnInit() {
  }

  selectEvent(event: Event) {
    event.isActive = !event.isActive;
    this.onEventTicketSelect.emit(event);
  }

  sortEvents(field: string) {
    if (field === this.sortingBy) {
      this.toggleSortingDirection();
    } else {
      this.sortingBy = field;
      this.sortingDirection = 'asc';
    }
    this.queryParams.sortBy = `${this.sortingBy}.${this.sortingDirection}`;
    this.queryParams.page = 1;
    this.onQueryChange.emit();
  }

  toggleSortingDirection() {
    this.sortingDirection = this.sortingDirection === 'asc' ? 'desc' : 'asc';
  }

  nextPage() {
    if (this.isLastPage()) return;
    this.queryParams.page++;
    this.onQueryChange.emit();
  }

  previousPage() {
    if (this.queryParams.page <= 1) return;

    this.queryParams.page--;
    this.onQueryChange.emit();
  }

  isLastPage() {
    return (this.queryParams.page * this.perPage) > this.meta.total;
  }

  pageDisplay() {
    const endingRecord = this.isLastPage() ? this.meta.total : (this.meta.page * this.perPage);
    return `${this.meta.page * this.perPage - 9} - ${endingRecord} of ${this.meta.total}`;
  }
}
