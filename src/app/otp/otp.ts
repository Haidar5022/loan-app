import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingService } from '../onboarding.service';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp.html',
  styleUrl: './otp.css'
})
export class Otp implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private onboarding = inject(OnboardingService);

  accountNo = '';
  secondsLeft = 30;
  resendEnabled = false;
  showToast = false;

  private countdownHandle: ReturnType<typeof setInterval> | null = null;

  form: FormGroup = this.fb.group({
    otp: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]]
  });

  get otp() {
    return this.form.get('otp')!;
  }

  ngOnInit(): void {
    this.accountNo = this.onboarding.getAccountNo();
    if (!this.accountNo) {
      this.router.navigate(['/login']);
      return;
    }
    this.startCountdown();
  }

onSubmit(): void {
  if (this.otp.invalid) {
    this.otp.markAsTouched();
    return;
  }
  this.showToast = true;

  // 1 second baad user ko automatic Loan Calculator page par bhej do
  setTimeout(() => {
    this.router.navigate(['/loan-calculator']);
  }, 1000);
}

onBack(): void {
  this.router.navigate(['/login']);
}

  onResend(): void {
    if (!this.resendEnabled) return;
    this.otp.reset('');
    this.showToast = false;
    this.startCountdown();
  }

  private startCountdown(): void {
    this.secondsLeft = 30;
    this.resendEnabled = false;
    this.stopCountdown();
    this.countdownHandle = setInterval(() => {
      this.secondsLeft--;
      if (this.secondsLeft <= 0) {
        this.stopCountdown();
        this.resendEnabled = true;
      }
    }, 1000);
  }

  private stopCountdown(): void {
    if (this.countdownHandle) {
      clearInterval(this.countdownHandle);
      this.countdownHandle = null;
    }
  }

  ngOnDestroy(): void {
    this.stopCountdown();
  }
}