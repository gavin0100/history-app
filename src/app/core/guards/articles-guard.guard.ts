import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const articlesGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = true;
  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
