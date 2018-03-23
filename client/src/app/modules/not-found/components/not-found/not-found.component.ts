import { Component, Renderer2, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnDestroy {
  private cssClass = 'background-blue';

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, this.cssClass);
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, this.cssClass);
  }

}
