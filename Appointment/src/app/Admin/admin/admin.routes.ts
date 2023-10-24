import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'admin/:id',
        loadComponent: () => import('./admin.page').then(m => m.AdminPage)
    },
    {
        path: 'profile/:id',
        loadComponent: () => import('../profile/profile.page').then(m => m.ProfilePage)
    },
    {
        path: 'appointments/:id',
        loadComponent: () => import('../appointments/appointments.page').then(m => m.AppointmentsPage)
    },
];
