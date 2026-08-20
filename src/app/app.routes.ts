import { Routes } from '@angular/router';
import { LoginComponent} from './login/login';
import { OtpComponent } from './otp/otp';
import {LoanCalculator} from './loan-calculator/loan-calculator';
import { LoanApplicationComponent } from './loan-application/loan-application';
import { DocumentUploadComponent } from './document-upload/document-upload';
import { BusinessDetailsComponent } from './business-details/business-details';
import { SummaryComponent } from './summary/summary';
import { ConfirmationComponent } from './confirmation/confirmation';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'otp', component: OtpComponent },
  { path: 'loan-calculator', component: LoanCalculator },
  { path: 'loan-application',component: LoanApplicationComponent},
  { path: 'document-upload', component: DocumentUploadComponent},
  { path: 'business-details', component:BusinessDetailsComponent},
  { path: 'summary', component: SummaryComponent},
  { path: 'confirmation', component:ConfirmationComponent},
  { path: '**', redirectTo: 'login' }
];