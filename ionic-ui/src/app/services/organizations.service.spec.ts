import { TestBed } from '@angular/core/testing';

import { OrganizationsService } from './organizations.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

describe('OrganizationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule], providers: [CookieService]}));

  it('should be created', () => {
    const service: OrganizationsService = TestBed.get(OrganizationsService);
    expect(service).toBeTruthy();
  });
});
