import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'chat',
        loadComponent: () =>
            import('./chat/chat.component').then(
                (mod) => mod.ChatComponent
            ),
    },
    {
        path: 'profile',
        loadComponent: () =>
            import('./profile/profile.component').then(
                (mod) => mod.ProfileComponent
            ),
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./auth/login/login.component').then(
                (mod) => mod.LoginComponent
            ),
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./auth/register/register.component').then(
                (mod) => mod.RegisterComponent
            ),
    },
];
