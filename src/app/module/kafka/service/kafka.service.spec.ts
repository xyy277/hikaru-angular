import { TestBed, inject } from '@angular/core/testing';

import { KafkaService } from './kafka.service';

describe('KafkaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KafkaService]
    });
  });

  it('should be created', inject([KafkaService], (service: KafkaService) => {
    expect(service).toBeTruthy();
  }));
});
