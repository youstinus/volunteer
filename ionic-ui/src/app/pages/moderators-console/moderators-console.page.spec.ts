import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorsConsolePage } from './moderators-console.page';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { LocationStrategy, APP_BASE_HREF, PathLocationStrategy } from '@angular/common';
import { Language } from 'src/app/utilities/Language';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

describe('ModeratorsConsolePage', () => {
  let component: ModeratorsConsolePage;
  let fixture: ComponentFixture<ModeratorsConsolePage>;
  const fakeActivatedRoute = {
    snapshot: { data: {}, params: Observable.create({ type: 'all' }) }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModeratorsConsolePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, RouterTestingModule, IonicModule, HttpClientModule],
      providers: [Location, LocationStrategy, HttpHandler,
        StreamingMedia, Language,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: APP_BASE_HREF, useValue: '.' },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        CookieService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorsConsolePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
