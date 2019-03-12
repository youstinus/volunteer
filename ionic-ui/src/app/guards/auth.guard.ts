import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    canActivate(
        // next: ActivatedRouteSnapshot,
        // state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // return true;

        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const userAuthenticated = false; // Get the current authentication state from a Service!

        if (userAuthenticated) {
            return true;
        } else {
            return false;
        }
    }
}
