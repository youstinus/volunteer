import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordPage } from './change-password.page';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { Language } from 'src/app/utilities/Language';
import { LocationStrategy, APP_BASE_HREF, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { MainPage } from '../main/main.page';


describe('ChangePasswordPage', () => {
  let component: ChangePasswordPage;
  let fixture: ComponentFixture<ChangePasswordPage>;
  const fakeActivatedRoute = {
    snapshot: { data: {}, params: Observable.create({ reset: 'YzM0YWU4MTc5ODcwYTg3YjVhNTY3MjEzNGE0N2FhNGQyZDRlYjIwMGI4M2NmMmYwYzllMTM3MDg1YmUwNDhmYjNuVVVtSlVFeEhQclczaXFKdjM5emc9PQ==' }) }
  } as ActivatedRoute;

  const routes: Routes = [
    {
      path: '',
      component: MainPage
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, RouterTestingModule, IonicModule, HttpClientModule],
      providers: [Location, LocationStrategy, HttpHandler, CookieService,
        StreamingMedia, Language, FormBuilder,
        //{provide: NavController, useValue : routes },
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: APP_BASE_HREF, useValue: '.' },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
