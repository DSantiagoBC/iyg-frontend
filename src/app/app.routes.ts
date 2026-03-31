import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Signup } from './signup/signup';

export const routes: Routes = [
  {
    path: 'home',
    component: Home
  },
  {
    path: 'auth/login',
    component: Login
  },
  {
    path: 'auth/signup',
    component: Signup
  }
];
