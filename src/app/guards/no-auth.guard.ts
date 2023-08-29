import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  public auth = environment;

  constructor(
    private router: Router,
  ){}

  async checkAuth(){
    const token = localStorage.getItem('token');
    if(token != undefined){
      this.router.navigate(['/home']);
      return false;
    }else{
      return true;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuth();
  }
  
}
