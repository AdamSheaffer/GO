import { TestBed, inject } from '@angular/core/testing';

import { ParkResolverService } from './park-resolver.service';

describe('ParkResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParkResolverService]
    });
  });

  it('should be created', inject([ParkResolverService], (service: ParkResolverService) => {
    expect(service).toBeTruthy();
  }));
});
