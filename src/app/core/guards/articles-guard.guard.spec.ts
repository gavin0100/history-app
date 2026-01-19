import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { articlesGuardGuard } from './articles-guard.guard';

describe('articlesGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => articlesGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
