import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterPage } from './footer.page';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { HttpHandler } from '@angular/common/http';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { Language } from 'src/app/utilities/Language';
import { CookieService } from 'ngx-cookie-service';
import { RouterTestingModule } from '@angular/router/testing';

describe('FooterPage', () => {
  let component: FooterPage;
  let fixture: ComponentFixture<FooterPage>;

  const fakeActivatedRoute = {
    snapshot: { data: {}, params: Observable.create({ type: 'all' }) }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule],
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
    fixture = TestBed.createComponent(FooterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
