import { Injectable } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { CanActivateFn } from "@angular/router";
import { AuthenticationService } from "../PMS_SERVICE/Authentication_S/authentication.service";

@Injectable({
    providedIn: 'root'
})

export class AUTHGUARD implements CanActivate {
    public loginEvent : EventEmitter<boolean>;
    
    constructor(private authService: AuthenticationService, private router: Router) {
        this.loginEvent = new EventEmitter();
    }
    canActivate(): boolean {
        if (this.authService.IsLoggedIn()) {
            return true;
        }
        this.router.navigate(['/pms-login']);
        return false;
    }
    public getCurrentUserMenu(): any {
        const menuList = localStorage.getItem('menuList');
        return menuList ? JSON.parse(menuList) : null;
    }
}