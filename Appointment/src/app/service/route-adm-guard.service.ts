import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RouteAdmGuardService implements CanActivate {

  constructor( public location: Location) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    if(localStorage.getItem('token')=='admin'){
      return true
    }else{
      this.location.back();
    return false
    }
}
}
