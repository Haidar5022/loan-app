import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Otp } from './otp/otp';
import {LoanCalculator} from './loan-calculator/loan-calculator';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'otp', component: Otp },
  { path: 'loan-calculator', component: LoanCalculator },
  { path: '**', redirectTo: 'login' }
];