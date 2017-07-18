import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
//import { LoginAuthenticationService } from '../services/login-authentication.service';


@Injectable()
export class AdminAuthGuard implements CanActivate {

    constructor(/*private loginAuthenticationService: LoginAuthenticationService*/) { }

    canActivate() {
        return true;
    }

}