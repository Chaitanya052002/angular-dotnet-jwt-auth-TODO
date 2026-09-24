import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { authGuard } from './guards/auth-guard';
import { Tasks } from './tasks/tasks';

export const routes: Routes = [
    
    { 
        path: 'login', 
        component: Login 
    },
    { 
        path: 'profile', 
        component: Profile,
        canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'tasks',
        component: Tasks,
        canActivate: [authGuard]
    },
    {
        path:'**',
        redirectTo: 'login'
    }
    
];
