import { TestBed } from '@angular/core/testing';

import { BaseService } from './base.service';
import { Volunteer } from '../models/Volunteer';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

describe('BaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule], providers: [CookieService]}));

  it('should be created', () => {
    const service: BaseService<Volunteer> = TestBed.get(BaseService);
    expect(service).toBeTruthy();
  });
});
