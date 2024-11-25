import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isAdmin$.pipe(
    map(isAdmin => isAdmin ? true : router.createUrlTree(['/login']))
  );
};