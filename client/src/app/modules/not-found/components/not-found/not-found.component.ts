import { Component, Renderer2, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnDestroy, AfterViewInit {
  private cssClass = 'background-blue';

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.renderer.addClass(document.body, this.cssClass);
    this.renderer.addClass(document.querySelector('.main'), this.cssClass);
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, this.cssClass);
    this.renderer.removeClass(document.querySelector('.main'), this.cssClass);
  }

}
