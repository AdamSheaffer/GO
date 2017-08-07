import { TestBed, inject } from '@angular/core/testing';

import { ParkService } from './park.service';

describe('ParkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParkService]
    });
  });

  it('should be created', inject([ParkService], (service: ParkService) => {
    expect(service).toBeTruthy();
  }));
});
