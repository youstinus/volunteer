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


import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  const fakeActivatedRoute = {
    snapshot: { data: { }, params: Observable.create({ type: 'all' }) }
  } as ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, RouterTestingModule, IonicModule, HttpClientModule],
      providers: [Location, LocationStrategy,HttpHandler,
        StreamingMedia,Language, 
      { provide: LocationStrategy, useClass: PathLocationStrategy },
      { provide: APP_BASE_HREF, useValue: '.'}, 
      {provide: ActivatedRoute, useValue: fakeActivatedRoute},
      CookieService
          ]    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a class member', () => {
    expect(component.menuLogin).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.loginWelcome).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.loginFieldset).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.loginUsername).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.loginPassword).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.loginForgot).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.loginButton).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.loginNewHere).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.loginSignUp).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.loginResetPasswordMessage).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.loginRequiredField).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.loginSuccessfulEmail).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.loginUnSuccessfulEmail).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.loginWrongHeader).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.loginWrongMessage).toBeDefined();
  });
  it('should have a working function', () => {
    expect(component.makeContent).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.ngOnInit).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.onSignIn).toBeTruthy();
  });
  /*it('should have a working function', () => {
    expect(component.presentFToast).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.presentNotLoggedIn).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.presentSToast).toBeTruthy();
  });*/
  it('should have a working function', () => {
    expect(component.sendEmail).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.forgotPass).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.goToRegister).toBeTruthy();
  });
  it('should have a class member', () => {
    expect(component.onLoginForm).toBeDefined();
  });
});
