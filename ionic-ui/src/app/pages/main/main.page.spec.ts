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
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule, } from '@angular/common/http/testing';

import { MainPage } from './main.page';

describe('MainPage', () => {
  let component: MainPage;
  let fixture: ComponentFixture<MainPage>;
  const fakeActivatedRoute = {
    snapshot: { data: { }, params: Observable.create({ type: 'all' }) }
  } as ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, RouterTestingModule, IonicModule, /*HttpClientModule,*/ HttpClientTestingModule],
      providers: [Location, LocationStrategy, // HttpHandler,
        StreamingMedia, Language,
      { provide: LocationStrategy, useClass: PathLocationStrategy },
      { provide: APP_BASE_HREF, useValue: '.'},
      {provide: ActivatedRoute, useValue: fakeActivatedRoute},
      CookieService
          ]    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a class member', () => {
    expect(component.mainEvents).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.mainStart).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.mainTitle).toBeDefined();
  });
  /*it('should have a class member', () => {
    expect(component.mainWantedOrganizations).toBeTruthy();
  });
  it('should have a class member', () => {
    expect(component.threeOrganizations).toBeTruthy();
  });
  it('should have a class member', () => {
    expect(component.threeProjects).toBeDefined();
  });
  it('should have a working function', () => {
    expect(component.filterNewOrganizations).toBeTruthy()
  });
  it('should have a working function', () => {
    expect(component.filterNewProjects).toBeTruthy()
  });*/
  it('should have a working function', () => {
    expect(component.getOrganizations).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.getProjects).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.ngOnInit).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.onOrganizationClicked).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.onProjectClicked).toBeTruthy();
  });
});
