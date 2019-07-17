import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private usersService: UsersService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const allowedRoles = next.data.allowedRoles;
        const userRole = this.usersService.getTokenRole();

        if (allowedRoles.length == 0 || (userRole == null && allowedRoles.length == 0) || !(userRole == null && allowedRoles.length > 0) || allowedRoles.includes(userRole)) {
            return true;
        }
        this.router.navigate(['main']).catch((reason) => console.log(reason));
        return false;
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const allowedRoles = next.data.allowedRoles;
        const userRole = this.usersService.getTokenRole();

        return allowedRoles.length == 0 || (userRole == null && allowedRoles.length == 0) || !(userRole == null && allowedRoles.length > 0) || allowedRoles.includes(userRole);
    }
}
