import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guards/authGuard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo:'login', pathMatch:'full' },
    {path: "home", component: HomeComponent, canActivate: [authGuard]},
    {path: "register", component: RegisterComponent},
    {path: "login", component: LoginComponent}
];
