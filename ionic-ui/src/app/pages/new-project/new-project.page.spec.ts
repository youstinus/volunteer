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
import { NewProjectPage } from './new-project.page';

describe('NewProjectPage', () => {
  let component: NewProjectPage;
  let fixture: ComponentFixture<NewProjectPage>;
  const fakeActivatedRoute = {
    snapshot: { data: { }, params: Observable.create({ type: 'all' }) }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProjectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, RouterTestingModule, IonicModule, HttpClientModule],
      providers: [Location, LocationStrategy,HttpHandler,
        StreamingMedia,Language, 
      { provide: LocationStrategy, useClass: PathLocationStrategy },
      { provide: APP_BASE_HREF, useValue: '.'}, 
      {provide: ActivatedRoute, useValue: fakeActivatedRoute},
      CookieService, RouterTestingModule
          ]    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a class member', () => {
    expect(component.newPojectHeader).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.newPojectImage).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.newPojectTitle).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.newPojectEmail).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.newPojectPhone).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.newPojectWebsite).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.newPojectDescription).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.newPojectStart).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.newPojectEnd).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.newPojectLocation).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.newPojectCreate).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.newPojectAlertNotHeader).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.newPojectAlertNotMessage).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.newPojectAlertOk).toBeDefined();
  });
  it('should have a working function', () => {
    expect(component.ngOnInit).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.onCreate).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.NotCreated).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.getId).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.onCreateForm).toBeDefined();
  });

});
