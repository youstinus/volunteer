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
import { MenuPage } from './menu.page';

describe('MenuPage', () => {
  let component: MenuPage;
  let fixture: ComponentFixture<MenuPage>;
  const fakeActivatedRoute = {
    snapshot: { data: { }, params: Observable.create({ type: 'all' }) }
  } as ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, RouterTestingModule, IonicModule, HttpClientModule],
      providers: [Location, LocationStrategy, HttpHandler,
        StreamingMedia, Language,
      { provide: LocationStrategy, useClass: PathLocationStrategy },
      { provide: APP_BASE_HREF, useValue: '.'},
      {provide: ActivatedRoute, useValue: fakeActivatedRoute},
      CookieService, RouterTestingModule
          ]    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.check).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.checkLogout).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.getRole).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.logout).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.ngOnInit).toBeTruthy();
  });
  it('should have a class memeber', () => {
    expect(component.menuLogout).toBeDefined();
  });
  it('should have a working function', () => {
    expect(component.pages).toBeDefined();
  });
  it('should have a working function', () => {
    expect(component.menuMenu).toBeDefined();
  });

});
