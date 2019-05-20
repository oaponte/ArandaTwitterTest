import { TestBed, inject } from '@angular/core/testing';

import { TweetsServiceService } from './tweets-service.service';

describe('TweetsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TweetsServiceService]
    });
  });

  it('should be created', inject([TweetsServiceService], (service: TweetsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
