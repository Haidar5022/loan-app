import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { loanReducer } from './state/loan.reducer'; // Import check karein

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    // Feature name 'loan' hona zaroori hai selector match karne ke liye:
    provideStore({
      loan: loanReducer
    })
  ]
};