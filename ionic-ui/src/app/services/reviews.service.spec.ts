import { TestBed } from '@angular/core/testing';

import { ReviewsService } from './reviews.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

describe('ReviewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule], providers: [CookieService]}));

  it('should be created', () => {
    const service: ReviewsService = TestBed.get(ReviewsService);
    expect(service).toBeTruthy();
  });
});
