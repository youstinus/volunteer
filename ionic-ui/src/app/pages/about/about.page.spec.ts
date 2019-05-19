import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {Location, LocationStrategy, PathLocationStrategy, APP_BASE_HREF} from '@angular/common';
import { AboutPage } from './about.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { Language } from 'src/app/utilities/Language';
import { RouterTestingModule } from '@angular/router/testing';

import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { promise } from 'protractor';
describe('AboutPage', () => {
  let component: AboutPage;
  let fixture: ComponentFixture<AboutPage>;
  const fakeActivatedRoute = {
    snapshot: { data: { }, params: Observable.create({ type: 'all' }) }
  } as ActivatedRoute;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, RouterTestingModule, IonicModule, HttpClientModule],
      providers: [Location, LocationStrategy,HttpHandler,
        StreamingMedia,Language, 
      { provide: LocationStrategy, useClass: PathLocationStrategy },
      { provide: APP_BASE_HREF, useValue: '.'}, 
      {provide: ActivatedRoute, useValue: fakeActivatedRoute}
          ]    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component instanceof AboutPage).toBe(true);
  });
  it('should have a class member', () => {
    expect(component.menuAboutUs).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.aboutTitle).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.aboutTitle2).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.aboutParag1).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.aboutParag2).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.aboutParag3).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.aboutParag4).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.aboutParag5).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.aboutParag6).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.aboutVisit).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.aboutOpinion).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.aboutButtonComment).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.aboutButtonVideo).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.aboutEnterEmail).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.aboutFeelFree).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.aboutComment).toBeDefined();
  });
   it('should have a class member', () => {
    expect(component.aboutRequired).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.commentForm).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.sources).toBeDefined();
  });
  it('should have a working function', () => {
    expect(component.startVideo).toBeTruthy();
  });
  it('should have working function', () => {
    expect(component.ngOnInit).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.leaveComment).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.sendEmail).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.commentResult).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.onSourceClicked).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.commentResult).toBeTruthy();
  });
});
