import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//import { safe} from './../../shared/safe.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {Location, LocationStrategy, PathLocationStrategy, APP_BASE_HREF} from '@angular/common';
import { OrganizationPage } from './organization.page';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { Language } from 'src/app/utilities/Language';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

describe('OrganizationPage', () => {
  let component: OrganizationPage;
  let fixture: ComponentFixture<OrganizationPage>;
  const fakeActivatedRoute = {
    snapshot: { data: { }, params: Observable.create({ type: 'all' }) }
  } as ActivatedRoute;
  @Pipe({ name: 'safe' })
  class SafePipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }
    transform(url) {
     return this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }
    }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationPage, SafePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule, IonicModule],
      providers: [Location, LocationStrategy,HttpHandler,
        StreamingMedia,Language, CookieService,
      { provide: LocationStrategy, useClass: PathLocationStrategy },
      { provide: APP_BASE_HREF, useValue: '.'}, 
      {provide: ActivatedRoute, useValue: fakeActivatedRoute},
     ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
