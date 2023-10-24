import { Routes } from '@angular/router';
import { RouteDocGuardService } from './service/route-doc-guard.service';
import { RoutePatGuardService } from './service/route-pat-guard.service';
import { RouteAdmGuardService } from './service/route-adm-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },
  {
    path: 'Patient',canActivate:[RoutePatGuardService],
    loadChildren: () => import('./Patient/patient/home.routes').then(m => m.routes)
  },
  {
    path: "Doctor", canActivate:[RouteDocGuardService],
    loadChildren: () => import('./Doctor/doctors/doctor.routes').then(m => m.routes)
  },
  {
    path: "Admin",canActivate:[RouteAdmGuardService],
    loadChildren: () => import('./Admin/admin/admin.routes').then(m => m.routes)
  },
  {
    path: 'login/:id',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'homepage',
    loadComponent: () => import('./homepage/homepage.page').then( m => m.HomepagePage)
  },
  {
    path: 'search',
    loadComponent: () => import('./search/search.page').then( m => m.SearchPage)
  },


];
