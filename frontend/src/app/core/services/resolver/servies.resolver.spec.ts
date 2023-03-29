import { TestBed } from '@angular/core/testing';

import { ServiesResolver } from './servies.resolver';

describe('ServiesResolver', () => {
  let resolver: ServiesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ServiesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
