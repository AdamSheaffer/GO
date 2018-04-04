import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../modules/core/services';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const url = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string) {
        if (this.authService.isLoggedIn()) return true;

        this.router.navigate(['/auth/login'], { queryParams: { redirectUrl: url } });
        return false;
    }

}