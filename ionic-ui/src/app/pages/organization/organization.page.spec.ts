import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { safe} from './../../shared/safe.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
import { HttpClientTestingModule, } from '@angular/common/http/testing';

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
      imports: [ReactiveFormsModule, /*HttpClientModule,*/ RouterTestingModule, IonicModule, HttpClientTestingModule],
      providers: [Location, LocationStrategy, // HttpHandler,
        StreamingMedia, Language, CookieService,
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
  it('should have a class member', () => {
    expect(component.orgsHeader).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgGoToProject).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgClipBoard).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgFindUs).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgComment).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgComments).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgDelteComment).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.orgProjects).toBeDefined();
  });

  /*it('should have a class member', () => {
    expect(component.userId).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.id).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.reviews).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.sum).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.average).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.names).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.volunteers).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.projects).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.onCreateForm).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.currentUser).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.volunteer).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.role).toBeDefined();
  });
  it('should have a class member', () => {
    expect(component.defaulUrl).toBeDefined();
  });*/
  it('should have a working function', () => {
    expect(component.onEmailClicked).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.onPhoneClicked).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.onSourceClicked).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.updateUrl).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.checkRole).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.del).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.delReview).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.getRole).toBeTruthy();
  });
  /*it('should have a working function', () => {
    expect(component.getVolunteer).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.isOwner).toBeTruthy();
  });*/
  it('should have a working function', () => {
    expect(component.ngOnInit).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.on1StarClicked).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.on2StarClicked).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.on3StarClicked).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.on4StarClicked).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.on5StarClicked).toBeTruthy();
  });
  it('should have a working function', () => {
    expect(component.onCreate).toBeTruthy();
  });
});
