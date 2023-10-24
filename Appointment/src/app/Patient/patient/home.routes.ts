import { Routes } from '@angular/router';

export const routes: Routes = [
  
      {
        path: 'patient/:id',
        loadComponent: () => import('./folder.page').then(m => m.FolderPage),
      },
      {
        path: 'profile/:id',
        loadComponent: () => import('../profile/profile.page').then( m => m.ProfilePage)
      },
      {
        path: 'notification/:id',
        loadComponent: () => import('../notification/notification.page').then( m => m.NotificationPage)
      },
      {
        path: 'appointment',
        loadComponent: () => import('../appointment/appointment.page').then( m => m.AppointmentPage)
      },
      {
        path: 'appointment/:id',
        loadComponent: () => import('../appointment/appointment.page').then( m => m.AppointmentPage)
      },
      
];
