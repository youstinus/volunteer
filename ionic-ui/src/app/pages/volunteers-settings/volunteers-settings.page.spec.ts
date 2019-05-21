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
import { HttpClientTestingModule,} from '@angular/common/http/testing';
import { VolunteersSettingsPage } from './volunteers-settings.page';

describe('VolunteersSettingsPage', () => {
  let component: VolunteersSettingsPage;
  let fixture: ComponentFixture<VolunteersSettingsPage>;
  const fakeActivatedRoute = {
    snapshot: { data: { }, params: Observable.create({ type: 'all' }) }
  } as ActivatedRoute;





  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteersSettingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, RouterTestingModule, IonicModule, /*HttpClientModule,*/HttpClientTestingModule],
      providers: [Location, LocationStrategy,//HttpHandler,
        StreamingMedia,Language, 
      { provide: LocationStrategy, useClass: PathLocationStrategy },
      { provide: APP_BASE_HREF, useValue: '.'}, 
      {provide: ActivatedRoute, useValue: fakeActivatedRoute},
      CookieService, RouterTestingModule
          ]    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteersSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a class member', () => {
    expect(component.volSettingsHeader).toBeDefined();
  });
      it('should have a class member', () => {
    expect(component.volSettingsImage).toBeDefined();
  });
      it('should have a class member', () => {
    expect(component.volSettingsName).toBeDefined();
  });
      it('should have a class member', () => {
    expect(component.volSettingsLastName).toBeDefined();
  });
      it('should have a class member', () => {
    expect(component.volSettingsPhone).toBeDefined();
  });
      it('should have a class member', () => {
    expect(component.volSettingsEmail).toBeDefined();
  });
      it('should have a class member', () => {
    expect(component.volSettingsDescription).toBeDefined();
  });
      it('should have a class member', () => {
    expect(component.volSettingsSaveChanges).toBeDefined();
  });
      it('should have a class member', () => {
    expect(component.volSettingsAlertSuccess).toBeDefined();
  });
      it('should have a class member', () => {
    expect(component.volSettingsAlertFail).toBeDefined();
  });
      it('should have a class member', () => {
    expect(component.volSettingsChangePass).toBeDefined();
  });
      it('should have a class member', () => {
    expect(component.volSettingsDeleteAcc).toBeDefined();
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
  it('should have a class member', () => {
    expect(component.user).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.defaulUrl).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.onSaveForm).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.volunteer).toBeDefined();
  });
  /*it('should have a working function', () => {
    expect(component.Confirm).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.changePic).toBeTruthy();
  });*/
  it('should have a working function', () => {
    expect(component.conf).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.onDelete).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.deleteUser).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.loadVolunteer).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.ngOnInit).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.onChangePass).toBeTruthy();
  });
  /*it('should have a working function', () => {
    expect(component.onChangePic).toBeTruthy();
  });*/
  it('should have a working function', () => {
    expect(component.onDelete).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.onSearchChange).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.presentFToast).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.presentSToast).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.saveVolunteer).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.updateIMG).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.updateUrl).toBeTruthy();
  });
  /*it('should have a working function', () => {
    expect(component.Confirm).toBeTruthy();
  });*/
});
