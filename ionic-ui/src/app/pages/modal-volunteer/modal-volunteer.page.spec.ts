import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {Location, LocationStrategy, PathLocationStrategy, APP_BASE_HREF} from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { Language } from 'src/app/utilities/Language';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { IonicModule,NavController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ModalVolunteerPage } from './modal-volunteer.page';


describe('ModalVolunteerPage', () => {
  let component: ModalVolunteerPage;
  let fixture: ComponentFixture<ModalVolunteerPage>;
  const fakeActivatedRoute = {
    snapshot: { data: { }, params: Observable.create({ type: 'all' }) }
  } as ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVolunteerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, RouterTestingModule, IonicModule, HttpClientModule],
      providers: [Location, LocationStrategy,HttpHandler,
        StreamingMedia,Language, 
      { provide: LocationStrategy, useClass: PathLocationStrategy },
      { provide: APP_BASE_HREF, useValue: '.'}, 
      {provide: ActivatedRoute, useValue: fakeActivatedRoute},
      {provide: NavParams, useValue: NavParamsMock},
      CookieService, RouterTestingModule,  NavController
          ]    })
    .compileComponents();
  }));

  class NavParamsMock {
    static returnParam = null;
    public get(key): any {
      if (NavParamsMock.returnParam) {
         return NavParamsMock.returnParam
      }
      return 'default';
    }
    static setParams(value){
      NavParamsMock.returnParam = value;
    }
  }
  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVolunteerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a class member', () => {
    expect(component.modalClose).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.modalNone).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.modalVAnonymous).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.modalVContatInfo).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.modalVDescription).toBeDefined();
  });
});

