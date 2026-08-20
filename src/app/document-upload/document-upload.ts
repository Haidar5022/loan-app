import { Component, OnInit ,input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// 1. Loan Application Component ko import karein
import { LoanApplicationComponent } from '../loan-application/loan-application';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    LoanApplicationComponent // 2. Imports array mein include karein
  ],
  templateUrl: './document-upload.html',
  styleUrls: ['./document-upload.css']
})
export class DocumentUploadComponent implements OnInit {
  refNumber = '1541544654666';
  progressPercent = 30;
  
  // Flag for Loan Details Dropdown Toggle
  isLoanDetailsOpen = false;
  
  addDocumentMenuOpen = false;
  isEditingFetchDetails = false;
  

  form!: FormGroup;

  steps = [
    { name: 'Verify Mobile Number', stage: 1, status: 'completed' },
    { name: 'Loan Details', stage: 2, status: 'completed' },
    { name: 'Document Upload', stage: 3, status: 'active' },
    { name: 'Business Details', stage: 4, status: 'pending' },
    { name: 'Director Details', stage: 5, status: 'pending' },
    { name: 'Director\'s Document Upload', stage: 6, status: 'pending' },
    { name: 'Collateral', stage: 7, status: 'pending' },
    { name: 'Existing Loans/Obligations', stage: 8, status: 'pending', route: '/existing-loans-obligations' },
    { name: 'Terms And Conditions', stage: 9, status: 'pending', route: '/terms-and-conditions' },
    { name: 'Summary', stage: 10, status: 'pending', route: '/summary' },
    { name: 'Digital Signature', stage: 11, status: 'pending', route: '/digital-signature' },
  
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      documents: this.fb.array([
        this.createDocGroup('Last 6 Months Bank Statement', true, true, false, 'Bank Statement.Pdf')
      ])
    });
  }

  get documentsArray(): FormArray {
    return this.form.get('documents') as FormArray;
  }

  createDocGroup(name: string, required: boolean, expanded: boolean, removable: boolean, fileName: string = ''): FormGroup {
    return this.fb.group({
      name: [name],
      required: [required],
      expanded: [expanded],
      removable: [removable],
      fileName: [fileName],
      hasFetchDetails: [true],
      fetchDetails: this.fb.group({
        accountHolderName: ['Sri hari G'],
        accountNumber: ['123456789012'],
        bankName: ['HDFC Bank'],
        ifscCode: ['HDFC0000123'],
        branchName: ['T. Nagar Branch'],
        statementPeriod: ['Jan 2024 - Jun 2024'],
        totalDebits: ['₹1,44,500.00'],
        totalCredits: ['₹1,50,000.00']
      })
    });
  }

  // Toggle Function for Loan Details Dropdown
  toggleLoanDetails(): void {
    this.isLoanDetailsOpen = !this.isLoanDetailsOpen;
  }

  getStepIcon(status: string): string {
    if (status === 'completed') return '✓';
    if (status === 'active') return '◐';
    return '';
  }

  scrollStepper(direction: number): void {
    // Scroll stepper logic
  }

  toggleAddDocumentMenu(): void {
    this.addDocumentMenuOpen = !this.addDocumentMenuOpen;
  }

  addDocument(docName: string): void {
    this.documentsArray.push(this.createDocGroup(docName, false, true, true));
    this.addDocumentMenuOpen = false;
  }

  removeDocument(index: number): void {
    if (index !== 0) {
      this.documentsArray.removeAt(index);
    }
  }

  toggleExpand(docGroup: any): void {
    const current = docGroup.get('expanded').value;
    docGroup.get('expanded').setValue(!current);
  }

  removeFile(index: number): void {
    this.documentsArray.at(index).get('fileName')?.setValue('');
  }

  triggerUpload(index: number): void {
    // File upload logic
  }

  onFileChosen(event: any): void {}

  onEditFetchDetails(): void {
    this.isEditingFetchDetails = !this.isEditingFetchDetails;
  }

  onReScan(index: number): void {
    console.log('Rescanning index:', index);
  }

  onBack(): void {
    this.router.navigate(['./loan-application']);
  }
  onNext(): void {
    this.router.navigate(['./business-details']);
  }
}