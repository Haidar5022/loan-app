import { Component ,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccordionItemComponent } from './accordion-item/accordion-item';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, AccordionItemComponent],
  templateUrl: './summary.html',
  styleUrl: './summary.css'
})
export class SummaryComponent {
  private router = inject(Router);
  openSectionId: string | null = 'loanDetails';

  // 11 Stages list
  stages = [
    { name: 'Verify Mobile Number', stage: 'Stage 1', status: 'done' },
    { name: 'Loan Details', stage: 'Stage 2', status: 'done' },
    { name: 'Document Upload', stage: 'Stage 3', status: 'done' },
    { name: 'Business Details', stage: 'Stage 4', status: 'done' },
    { name: 'Director Details', stage: 'Stage 5', status: 'done' },
    { name: 'Disbursement Details', stage: 'Stage 6', status: 'done' },
    { name: 'Credit Bureau', stage: 'Stage 7', status: 'done' },
    { name: 'Collateral Details', stage: 'Stage 8', status: 'done' },
    { name: 'Terms And Conditions', stage: 'Stage 9', status: 'done' },
    { name: 'Summary', stage: 'Stage 10', status: 'active' },
    { name: 'Digital Sign', stage: 'Stage 11', status: 'pending' }
  ];

  // Nested sub-accordions state
  nestedOpen: { [key: string]: boolean } = {
    bankStatement: true,
    balanceSheet: false,
    regCert: false,
    incorpCert: false,
    director1: true
  };

  summaryData = {
    loanDetails: {
      amountRequested: '4,00,000',
      interestPayable: '4,00,000',
      tenure: '1 year',
      totalPrincipal: '4,00,000',
      interestRate: '5.6',
      totalPayable: '4,00,000',
      emiAmount: '4,00,000',
      repaymentFreq: 'Monthly',
      emiStartDate: '26/03/2025',
      loanPurpose: 'Monthly',
      creditFacilityRequired: 'Business Loan',
      collateralOffer: 'Yes',
      currentCreditFacility: 'Yes'
    },
    businessDetails: {
      name: 'Rumango',
      type: 'LTD',
      nature: 'Retail',
      segment: 'Retail',
      industry: 'Retail',
      directorsCount: '4',
      country: 'India',
      incorporationDate: '24/07/1997',
      regNumber: '6378291',
      tinNumber: 'Income',
      operationYears: '2',
      employees: '2',
      annualTurnover: '2',
      stockLevel: '2',
      telephone: '155556656565',
      intensiveType: 'Labour',
      address: 'Akshay Tech Park',
      parentCompany: 'Income',
      bankingRelationship: 'Labour',
      customerDesc: 'Labour',
      businessDesc: 'Labour'
    },
    director1: {
      cif: '9876543567890',
      prefix: 'Mr',
      firstName: 'Sri Hari',
      lastName: 'Gopal',
      position: 'Director',
      dob: '24/07/1997',
      gender: 'Male',
      nationality: 'Indian',
      idNumber: '249624961212',
      issueDate: '24/07/1997',
      expiryDate: '26/03/2025',
      issueCountry: 'India',
      residenceCountry: 'India',
      sharePercentage: '20',
      maritalStatus: 'Married'
    },
    disbursement: {
      type: 'Account',
      accountType: 'Internal',
      hasInternalAccount: 'Yes',
      accountNo: '9876543567890',
      accountHolder: 'Srihari',
      branchName: 'HDFC- Whitefield'
    },
    creditBureau: {
      nationalId: 'EYIPS6714',
      mobileNo: '987654324567',
      status: 'Good'
    },
    collaterals: [
      { name: 'Credit Card Details', ownership: 'Self', value: '3,00,000', desc: 'Detailed information regarding the collateral, in..' },
      { name: 'VAF Details', ownership: 'Self', value: '3,00,000', desc: 'Detailed information regarding the collateral, in..' }
    ],
    existingLoans: [
      { bank: 'HDFC Bank', accountNo: '154484848485', tenure: '5 Month', outstanding: '3,00,000', loanAmount: '3,00,000', monthlyRepay: '3,00,000' },
      { bank: 'DTB Bank', accountNo: '154484848485', tenure: '10 Month', outstanding: '3,00,000', loanAmount: '3,00,000', monthlyRepay: '3,00,000' }
    ]
  };

  handleToggle(sectionId: string): void {
    this.openSectionId = this.openSectionId === sectionId ? null : sectionId;
  }

  toggleNested(key: string): void {
    this.nestedOpen[key] = !this.nestedOpen[key];
  }
  onBack(): void {
      
    this.router.navigate(['/business-details']);
  }

  onNext(): void {
     
    this.router.navigate(['/confirmation']);
  }

}