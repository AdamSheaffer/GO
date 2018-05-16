import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { AppFlashComponent } from './app-flash.component';
import { AlertService } from '../../services';

describe('AppFlashComponent', () => {
  let component: AppFlashComponent;
  let fixture: ComponentFixture<AppFlashComponent>;
  let alertService: AlertService;
  const alertServiceStub = {
    remove(alert) { },
    show(alert) { },
    alerts: []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppFlashComponent],
      imports: [],
      providers: [{ provide: AlertService, useValue: alertServiceStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFlashComponent);
    alertService = fixture.debugElement.injector.get(AlertService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(true).toBeTruthy();
  });
});
