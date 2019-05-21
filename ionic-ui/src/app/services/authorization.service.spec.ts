import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';
import { JwtHelper } from '../utilities/JwtHelper';

describe('AuthorizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [JwtHelper]
  }));

  it('should be created', () => {
    const service: AuthorizationService = TestBed.get(AuthorizationService);
    expect(service).toBeTruthy();
  });
});
