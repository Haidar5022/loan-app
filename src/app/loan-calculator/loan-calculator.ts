import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-calculator.html',
  styleUrl: './loan-calculator.css'
})
export class LoanCalculator {
  private router = inject(Router);

  // Sliders Values
  amount: number = 142669;
  tenure: number = 1;
  tenureType: 'Year' | 'Month' | 'Days' = 'Year';

  // Interest Rate (Example: 8.5%)
  interestRate: number = 8.5;

  // Real-time Calculated Properties
  get monthlyEmi(): number {
    const months = this.getTenureInMonths();
    if (months === 0) return this.amount;
    const r = this.interestRate / 12 / 100;
    const emi = (this.amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    return Math.round(emi || 0);
  }

  get totalInterest(): number {
    const months = this.getTenureInMonths();
    return Math.round((this.monthlyEmi * months) - this.amount);
  }

  get totalAmount(): number {
    return this.amount + (this.totalInterest > 0 ? this.totalInterest : 0);
  }

  getTenureInMonths(): number {
    if (this.tenureType === 'Year') return this.tenure * 12;
    if (this.tenureType === 'Month') return this.tenure;
    return Math.ceil(this.tenure / 30); // Days to approx months
  }

  setTenureType(type: 'Year' | 'Month' | 'Days'): void {
    this.tenureType = type;
  }

  onBack(): void {
    this.router.navigate(['/otp']);
  }

  onApply(): void {
    alert('Loan Application Submitted Successfully!');
  }
}