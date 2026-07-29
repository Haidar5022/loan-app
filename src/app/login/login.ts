import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingService } from '../onboarding.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private onboarding = inject(OnboardingService);

  form: FormGroup = this.fb.group({
    accountNo: ['', [Validators.required, Validators.pattern(/^[0-9]{9,16}$/)]]
  });

  get accountNo() {
    return this.form.get('accountNo')!;
  }

  onContinue(): void {
    if (this.accountNo.invalid) {
      this.accountNo.markAsTouched();
      return;
    }
    this.onboarding.setAccountNo(this.accountNo.value);
    this.router.navigate(['/otp']);
  }
}