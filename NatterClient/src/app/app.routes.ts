import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'chat',
        loadComponent: () =>
            import('./components/chat/chat.component').then(
                (mod) => mod.ChatComponent
            ),
    },
    {
        path: 'profile',
        loadComponent: () =>
            import('./components/profile/profile.component').then(
                (mod) => mod.ProfileComponent
            ),
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./components/auth/login/login.component').then(
                (mod) => mod.LoginComponent
            ),
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./components/auth/register/register.component').then(
                (mod) => mod.RegisterComponent
            ),
    },
];
