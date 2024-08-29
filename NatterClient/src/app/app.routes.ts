import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'home',
        pathMatch: "full",
        component: HomeComponent
    },
    {
        path: 'chat',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./components/chat/chat.component').then((mod) => mod.ChatComponent),
    },
    {
        path: "profile/track/:username",
        canActivate: [authGuard],
        loadComponent: () =>
            import('./components/profile/user-activity/user-activity.component').then((mod) => mod.UserActivityComponent)
    },
    {
        path: 'profile',
        title: "Profile | Natter",
        canActivate: [authGuard],
        loadComponent: () =>
            import('./components/profile/profile.component').then((mod) => mod.ProfileComponent),
        children: [
            {
                path: "",
                redirectTo: "track",
                pathMatch: "full"
            },
            {
                path: "track",
                title: "Profile | Natter",
                loadComponent: () =>
                    import('./components/profile/user-activity/user-activity.component').then((mod) => mod.UserActivityComponent)
            },
            {
                path: "update",
                title: "Update Profile | Natter",
                loadComponent: () =>
                    import('./components/profile/update-user/update-user.component').then((mod) => mod.UpdateUserComponent)
            },
            {
                path: "delete",
                title: "Delete Account | Natter",
                loadComponent: () =>
                    import('./components/profile/delete-user/delete-user.component').then((mod) => mod.DeleteUserComponent)
            }
        ]
    },
    {
        path: 'login',
        title: "Login | Natter",
        loadComponent: () =>
            import('./components/auth/login/login.component').then((mod) => mod.LoginComponent),
    },
    {
        path: 'register',
        title: "Register | Natter",
        loadComponent: () =>
            import('./components/auth/register/register.component').then((mod) => mod.RegisterComponent),
    },
    {
        path: "**",
        pathMatch: "full",
        title: "404 - Page Not Found | Natter",
        loadComponent: () => 
            import('./components/shared/not-found/not-found.component').then(mod => mod.NotFoundComponent)
    }
];
