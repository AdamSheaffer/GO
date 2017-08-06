import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const url = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string) {
        if (this.authService.isLoggedIn()) return true;

        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    }

}