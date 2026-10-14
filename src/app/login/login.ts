import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OnboardingService } from '../onboarding.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  accountNumber: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private onboardingService: OnboardingService
  ) {}

  ngOnInit(): void {
    this.authenticate();
  }

  authenticate(): void {
    this.onboardingService.signInWebsiteUser().subscribe({
      next: () => console.log('Token successfully generated and stored'),
      error: (err: any) => console.error('Signin API failed:', err)
    });
  }

  onContinue(): void {
    this.errorMessage = '';

    if (!this.accountNumber || !this.accountNumber.trim()) {
      this.errorMessage = 'Please enter Account Number or Mobile';
      return;
    }

    this.router.navigate(['/otp'], { queryParams: { acc: this.accountNumber.trim() } });
  }
}