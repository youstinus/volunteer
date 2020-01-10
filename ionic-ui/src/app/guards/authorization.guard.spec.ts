import { TestBed, inject } from '@angular/core/testing';

import { AuthorizationGuard } from './authorization.guard';
import { JwtHelper } from '../utilities/JwtHelper';
import { AuthorizationService } from '../services/authorization.service';
import { NavController, IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { HttpHandler } from '@angular/common/http';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthorizationGuard', () => {
  const fakeActivatedRoute = {
    snapshot: { data: {}, params: Observable.create({ type: 'all' }) }
  } as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Location,
        LocationStrategy,
        HttpHandler,
        StreamingMedia,
        AuthorizationGuard,
        AuthorizationService,
        JwtHelper,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: APP_BASE_HREF, useValue: '.' }, ],
      imports: [RouterTestingModule, IonicModule, HttpClientTestingModule]
    });
  });

  it('should ...', inject([AuthorizationGuard], (guard: AuthorizationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
