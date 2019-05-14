import { TestBed } from '@angular/core/testing';

import { VolunteersService } from './volunteers.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

describe('VolunteersService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule], providers: [CookieService]}));

  it('should be created', () => {
    const service: VolunteersService = TestBed.get(VolunteersService);
    expect(service).toBeTruthy();
  });
});
