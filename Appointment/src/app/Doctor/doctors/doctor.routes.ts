import { Routes } from '@angular/router';

export const routes: Routes = [
  
      {
        path: 'doctors/:id',
        loadComponent: () => import('./doctors.page').then(m => m.DoctorsPage),

      },
      {
        path: 'appointment/:id',
        loadComponent: () => import('../appointment/appointment.page').then( m => m.AppointmentPage)
      },
      {
        path: 'notification/:id',
        loadComponent: () => import('../notification/notification.page').then( m => m.NotificationPage)
      },
      // {
      //   path: 'history/:id',
      //   loadComponent: () => import('../history/history.page').then( m => m.HistoryPage)
      // },
      {
        path: 'profile/:id',
        loadComponent: () => import('../profile/profile.page').then( m => m.ProfilePage)
      },
];
