import { TestBed } from '@angular/core/testing';

import { PicturesService } from './pictures.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

describe('PicturesService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule], providers: [CookieService]}));

  it('should be created', () => {
    const service: PicturesService = TestBed.get(PicturesService);
    expect(service).toBeTruthy();
  });
});
