import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

describe('UsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule], providers: [CookieService]}));

  it('should be created', () => {
    const service: UsersService = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });
});
