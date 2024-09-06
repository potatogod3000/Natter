import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthStore } from '../stores/auth.store';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
    const authService: AuthService = inject(AuthService);
    const authStore: AuthStore = inject(AuthStore);
    const router = inject(Router);

    
    return authService.performAuthCheck()
    .pipe(
        map( (response) => {
            authStore.currentAuthStatus.set(response);
            if (response.isAuthenticated) return true;
            else {
                return router.createUrlTree(['/login']);
            }
        }),
        catchError(() => {
            return of(router.createUrlTree(['/login']));
        })
    );
};

export const canActivateChild: CanActivateChildFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => authGuard(route, state);