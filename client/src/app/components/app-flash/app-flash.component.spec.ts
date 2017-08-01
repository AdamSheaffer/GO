import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFlashComponent } from './app-flash.component';

describe('AppFlashComponent', () => {
  let component: AppFlashComponent;
  let fixture: ComponentFixture<AppFlashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFlashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFlashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
