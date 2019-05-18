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
    fixture = TestBed.createComponent(OrganizationsSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
