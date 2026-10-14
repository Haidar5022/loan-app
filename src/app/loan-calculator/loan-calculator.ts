// import { Component, inject, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { OnboardingService } from '../onboarding.service';

// @Component({
//   selector: 'app-loan-calculator',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './loan-calculator.html',
//   styleUrl: './loan-calculator.css'
// })
// export class LoanCalculator implements OnInit {
//   private router = inject(Router);
//   private onboardingService = inject(OnboardingService);

//   // Sliders Inputs
//   amount: number = 142669;
//   tenure: number = 1;
//   tenureType: 'Year' | 'Month' | 'Days' = 'Year';
//   interestRate: number = 10;

//   // Display Output Variables (HTML se matched)
//   monthlyEmi: number = 0;
//   totalInterest: number = 0;
//   totalAmount: number = 0;

//   ngOnInit(): void {
//     this.fetchEmiCalculation();
//   }

//   fetchEmiCalculation(): void {
//     const months = this.getTenureInMonths();

//     // Service ka sahi naam call kiya gaya
//     this.onboardingService.calculateLoan(this.amount, months, this.interestRate).subscribe({
//       next: (res: any) => {
//         console.log('EMI Calculation API Success:', res);
//         // Backend keys mapping
//         this.monthlyEmi = res?.emi || res?.monthlyEmi || res?.installmentAmount || 0;
//         this.totalInterest = res?.totalInterest || res?.interestAmount || 0;
//         this.totalAmount = this.amount + this.totalInterest;
//       },
//       error: (err: any) => {
//         console.warn('EMI API Failed (Using local fallback calculation):', err);
//         this.calculateLocalFallback(months);
//       }
//     });
//   }

//   private calculateLocalFallback(months: number): void {
//     if (months === 0) {
//       this.monthlyEmi = this.amount;
//       this.totalInterest = 0;
//       this.totalAmount = this.amount;
//       return;
//     }
//     const r = this.interestRate / 12 / 100;
//     const emi = (this.amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
//     this.monthlyEmi = Math.round(emi || 0);
//     this.totalInterest = Math.round((this.monthlyEmi * months) - this.amount);
//     this.totalAmount = this.amount + (this.totalInterest > 0 ? this.totalInterest : 0);
//   }

//   getTenureInMonths(): number {
//     if (this.tenureType === 'Year') return this.tenure * 12;
//     if (this.tenureType === 'Month') return this.tenure;
//     return Math.max(1, Math.ceil(this.tenure / 30));
//   }

//   setTenureType(type: 'Year' | 'Month' | 'Days'): void {
//     this.tenureType = type;
//     this.fetchEmiCalculation();
//   }

//   onBack(): void {
//     this.router.navigate(['./otp']);
//   }

//   onApply(): void {
//     this.router.navigate(['./loan-application']);
//   }
// }
// import { Component, inject, OnInit, signal, computed } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { OnboardingService } from '../onboarding.service';

// @Component({
//   selector: 'app-loan-calculator',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './loan-calculator.html',
//   styleUrl: './loan-calculator.css'
// })
// export class LoanCalculator implements OnInit {
//   private router = inject(Router);
//   private onboardingService = inject(OnboardingService);

//   // 1. Writable Signals (Inputs/State)
//   amount = signal<number>(142669);
//   tenure = signal<number>(1);
//   tenureType = signal<'Year' | 'Month' | 'Days'>('Year');
//   interestRate = signal<number>(10);

//   // 2. Writable Signals (Backend Response Outputs)
//   monthlyEmi = signal<number>(0);
//   totalInterest = signal<number>(0);

//   // 3. Computed Signal (amount ya totalInterest badalte hi ye khud update hoga)
//   totalAmount = computed(() => this.amount() + this.totalInterest());

//   // 4. Computed Signal (Tenure Unit standard months me auto-convert hogi)
//   tenureInMonths = computed(() => {
//     const type = this.tenureType();
//     const value = this.tenure();

//     if (type === 'Year') return value * 12;
//     if (type === 'Month') return value;
//     return Math.max(1, Math.ceil(value / 30));
//   });

//   ngOnInit(): void {
//     this.fetchEmiCalculation();
//   }

//   fetchEmiCalculation(): void {
//     const months = this.tenureInMonths();
//     const currentAmount = this.amount();
//     const rate = this.interestRate();

//     this.onboardingService.calculateLoan(currentAmount, months, rate).subscribe({
//       next: (res: any) => {
      
//         console.log('EMI Calculation API Success:', res);
//         this.monthlyEmi.set(res?.emi || res?.monthlyEmi || res?.installmentAmount || 0);
//         this.totalInterest.set(res?.totalInterest || res?.interestAmount || 0);
//       },
//       error: (err: any) => {
//         console.warn('EMI API Failed (Using local fallback calculation):', err);
//         this.calculateLocalFallback(currentAmount, months, rate);
//       }
//     });
//   }

//   private calculateLocalFallback(currentAmount: number, months: number, rate: number): void {
//     if (months === 0) {
//       this.monthlyEmi.set(currentAmount);
//       this.totalInterest.set(0);
//       return;
//     }
//     const r = rate / 12 / 100;
//     const emi = (currentAmount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
//     const calculatedEmi = Math.round(emi || 0);

//     this.monthlyEmi.set(calculatedEmi);
//     this.totalInterest.set(Math.round((calculatedEmi * months) - currentAmount));
//   }

//   setTenureType(type: 'Year' | 'Month' | 'Days'): void {
//     this.tenureType.set(type);
//     this.fetchEmiCalculation();
//   }

//   onBack(): void {
//     this.router.navigate(['./otp']);
//   }

//   onApply(): void {
//     this.router.navigate(['./loan-application']);
//   }
// }      

import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { OnboardingService } from '../onboarding.service';
import { updateLoanInputs, setCalculatedEmi } from '../state/loan.actions';

@Component({
  selector: 'app-loan-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-calculator.html',
  styleUrl: './loan-calculator.css'
})
export class LoanCalculator implements OnInit {
  private router = inject(Router);
  private onboardingService = inject(OnboardingService);
  private store = inject(Store);

  // 1. Writable Signals for State
  amount = signal<number>(142669);
  tenure = signal<number>(1);
  tenureType = signal<'Year' | 'Month' | 'Days'>('Year');
  interestRate = signal<number>(10);

  monthlyEmi = signal<number>(0);
  totalInterest = signal<number>(0);

  // 2. Computed Signals
  totalAmount = computed(() => this.amount() + this.totalInterest());

  tenureInMonths = computed(() => {
    const type = this.tenureType();
    const val = this.tenure();
    if (type === 'Year') return val * 12;
    if (type === 'Month') return val;
    return Math.max(1, Math.ceil(val / 30));
  });

  ngOnInit(): void {
    this.fetchEmiCalculation();
  }

  // 3. Slider Drag Handlers
  onAmountChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const val = Number(input.value);
    this.amount.set(val);
    this.fetchEmiCalculation();
  }

  onTenureChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const val = Number(input.value);
    this.tenure.set(val);
    this.fetchEmiCalculation();
  }

  setTenureType(type: 'Year' | 'Month' | 'Days'): void {
    this.tenureType.set(type);
    this.fetchEmiCalculation();
  }

  // 4. EMI Calculation Engine
  fetchEmiCalculation(): void {
    const months = this.tenureInMonths();
    const currentAmount = this.amount();
    const rate = this.interestRate();

    // Pehle instant local mathematical calculation run karein taaki screen par zero na dikhe
    this.runLocalCalculation(currentAmount, months, rate);

    // Uske baad backend API call karein
    this.onboardingService.calculateLoan(currentAmount, months, rate).subscribe({
      next: (res: any) => {
        const emi = Number(res?.emi || res?.monthlyEmi || res?.installmentAmount || res?.data?.emi || 0);
        const interest = Number(res?.totalInterest || res?.interestAmount || res?.data?.totalInterest || 0);

        if (emi > 0) {
          this.monthlyEmi.set(emi);
          this.totalInterest.set(interest);
          this.syncWithStore(emi, interest);
        }
      },
      error: (err: any) => {
        console.warn('Backend unavailable, local fallback active:', err);
      }
    });
  }

  private runLocalCalculation(principal: number, months: number, rate: number): void {
    if (!months || months <= 0) {
      this.monthlyEmi.set(principal);
      this.totalInterest.set(0);
      this.syncWithStore(principal, 0);
      return;
    }

    const monthlyRate = rate / 12 / 100;
    const factor = Math.pow(1 + monthlyRate, months);
    const emi = Math.round((principal * monthlyRate * factor) / (factor - 1)) || 0;
    const totalInt = Math.max(0, Math.round((emi * months) - principal));

    this.monthlyEmi.set(emi);
    this.totalInterest.set(totalInt);
    this.syncWithStore(emi, totalInt);
  }

  private syncWithStore(emi: number, interest: number): void {
    try {
      this.store.dispatch(updateLoanInputs({
        amount: this.amount(),
        tenure: this.tenure(),
        tenureType: this.tenureType()
      }));
      this.store.dispatch(setCalculatedEmi({
        emi,
        totalInterest: interest
      }));
    } catch (e) {
      console.error('NgRx Store dispatch failed:', e);
    }
  }

  onBack(): void {
    this.router.navigate(['./otp']);
  }

  onApply(): void {
    this.router.navigate(['./loan-application']);
  }
}