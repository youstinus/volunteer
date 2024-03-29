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

import { OrganizationsSettingsPage } from './organizations-settings.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrganizationsSettingsPage', () => {
  let component: OrganizationsSettingsPage;
  let fixture: ComponentFixture<OrganizationsSettingsPage>;
  const fakeActivatedRoute = {
    snapshot: { data: { }, params: Observable.create({ type: 'all' }) }
  } as ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsSettingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, RouterTestingModule, IonicModule, /*HttpClientModule,*/ HttpClientTestingModule],
      providers: [Location, LocationStrategy, // HttpHandler,
        StreamingMedia, Language,
      { provide: LocationStrategy, useClass: PathLocationStrategy },
      { provide: APP_BASE_HREF, useValue: '.'},
      {provide: ActivatedRoute, useValue: fakeActivatedRoute},
      CookieService, RouterTestingModule
          ]    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a class member', () => {
    expect(component.orgSettingsHeader).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgSettingsImage).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgSettingsWebsite).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgSettingsTitle).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgSettingsAddress).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgSettingsPhone).toBeDefined();
  });
  /*it('should have a class member', () => {
    expect(component.orgSettingsEmail).toBeDefined();
  });*/
  it('should have a class member', () => {
    expect(component.orgSettingsDescription).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgSettingsSaveChanges).toBeDefined();
  });
  /*it('should have a class member', () => {
    expect(component.orgSettingsAlertSuccess).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgSettingsAlertFail).toBeDefined();
  });*/
  it('should have a class member', () => {
    expect(component.orgSettingsChangePass).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgSettingsDeleteAcc).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgSettingsDeleteAalert).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgSettingsDeleteConfirm).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgSettingsDeleteButton).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgSettingsAlertConfirm).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgSettingsDeleteCancel).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgSettingsDeleted).toBeDefined();
  });
  it('should have a working function ', () => {
    expect(component.saveOrganization).toBeTruthy();
  });
  it('should have a working function ', () => {
    expect(component.updateIMG).toBeTruthy();
  });
  it('should have a working function ', () => {
    expect(component.updateUrl).toBeTruthy();
  });
  /*it('should have a working function ', () => {
    expect(component.Confirm).toBeTruthy();
  });
  it('should have a working function ', () => {
    expect(component.changePic).toBeTruthy();
  });*/
  it('should have a working function ', () => {
    expect(component.conf).toBeTruthy();
  });
  it('should have a working function ', () => {
    expect(component.onDelete).toBeTruthy();
  });
  it('should have a working function ', () => {
    expect(component.loadOrganization).toBeTruthy();
  });
  it('should have a working function ', () => {
    expect(component.ngOnInit).toBeTruthy();
  });
  it('should have a working function ', () => {
    expect(component.onChangePass).toBeTruthy();
  });
  /*it('should have a working function ', () => {
    expect(component.onChangePic).toBeTruthy();
  });*/
  it('should have a working function ', () => {
    expect(component.onDelete).toBeTruthy();
  });
  it('should have a working function ', () => {
    expect(component.onSearchChange).toBeTruthy();
  });
});
