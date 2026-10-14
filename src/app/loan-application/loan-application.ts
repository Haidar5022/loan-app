// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-loan-application',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './loan-application.html',
//   styleUrls: ['./loan-application.css']
// })
// export class LoanApplicationComponent implements OnInit {

//   // --- MISSING VARIABLES (Inki wajah se error aa rahi thi) ---
//   refNumber: string = '1541544654666';
//   progressPercent: number = 20;

//   steps = [
//     { name: 'Verify Mobile Number', stage: 1, status: 'completed' },
//     { name: 'Loan Details', stage: 2, status: 'active' },
//     { name: 'Document Upload', stage: 3, status: 'pending' },
//     { name: 'Business Details', stage: 4, status: 'pending' },
//     { name: 'Director Details', stage: 5, status: 'pending' },
//     { name: 'Director\'s Document Upload', stage: 6, status: 'pending' },
//     { name: 'Collateral', stage: 7, status: 'pending' },
//     { name: 'Existing Loans/Obligations', stage: 8, status: 'pending', route: '/existing-loans-obligations' },
//     { name: 'Terms And Conditions', stage: 9, status: 'pending', route: '/terms-and-conditions' },
//     { name: 'Summary', stage: 10, status: 'pending', route: '/summary' },
//     { name: 'Digital Signature', stage: 11, status: 'pending', route: '/digital-signature' },
//   ];

  
//   // -------------------------------------------------------------

//   // Form Fields & Values
//   requestedAmount: string = 'GHS 150,000.00';
//   interestPayable: string = 'GHS 12,500.00';
//   tenure: string = '24 Months';
//   totalPrincipal: string = 'GHS 150,000.00';
//   emiAmount: string = 'GHS 6,770.83';
//   totalPayable: string = 'GHS 162,500.00';

//   purposeOfLoan: string = 'Business Expansion';
//   hasCollateral: string = 'yes';
//   hasExistingFacility: string = 'no';

//   currentStepIndex: number = 2;

//   ngOnInit(): void {}

//   constructor(private router: Router) {}

//   onBack(): void {
// this.router.navigate(['./loan-calculator'])
//   }

//   onNext(): void {
//    this.router.navigate(['./document-upload']);
//   }
// }



import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { 
  selectLoanAmount, 
  selectMonthlyEmi, 
  selectTotalInterest, 
  selectTotalPayable, 
  selectTenure 
} from '../state/loan.selectors';

@Component({
  selector: 'app-loan-application',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-application.html',
  styleUrl: './loan-application.css'
})
export class LoanApplicationComponent {
  private router = inject(Router);
  private store = inject(Store);

  // Read Global Data from NgRx Store as Signals
  requestedAmount = this.store.selectSignal(selectLoanAmount);
  totalPrincipal = this.store.selectSignal(selectLoanAmount);
  interestPayable = this.store.selectSignal(selectTotalInterest);
  emiAmount = this.store.selectSignal(selectMonthlyEmi);
  totalPayable = this.store.selectSignal(selectTotalPayable);
  tenure = this.store.selectSignal(selectTenure);

  // Header & Step Tracker Data
  refNumber: string = 'APP-' + Math.floor(100000 + Math.random() * 900000);
  progressPercent: number = 33;
  steps = [
    { name: 'Loan Application', status: 'active' },
    { name: 'Business Details', status: 'pending' },
    { name: 'Document Upload', status: 'pending' }
  ];

  // Form Inputs
  purposeOfLoan: string = 'working_capital';
  hasCollateral: string = 'no';
  hasExistingFacility: string = 'no';

  onBack(): void {
    this.router.navigate(['./loan-calculator']);
  }

  onNext(): void {
    this.router.navigate(['./business-details']);
  }
}