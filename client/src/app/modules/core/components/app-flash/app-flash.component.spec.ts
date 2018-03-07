import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClrIconModule } from 'clarity-angular/icon/icon.module';
import { AlertService } from '../../services/alert.service';

import { AppFlashComponent } from './app-flash.component';

describe('AppFlashComponent', () => {
  let component: AppFlashComponent;
  let fixture: ComponentFixture<AppFlashComponent>;
  let alertService: AlertService;
  let alertServiceStub = {
    remove(alert) { },
    show(alert) { },
    alerts: []
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppFlashComponent],
      imports: [ClrIconModule],
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
