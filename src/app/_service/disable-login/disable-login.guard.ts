import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiWithTokenService } from '../api-with-token/api-with-token.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DisableLoginGuard implements CanActivate {
  constructor(
    public ApiWithTokenService: ApiWithTokenService,
    public CookieService : CookieService,
    private router: Router,
  ){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.ApiWithTokenService.isLoggednIn()) {
        this.router.navigate(['/dashboard']);
        return false;
      }else {
        return true;
      }
  }
  
}
