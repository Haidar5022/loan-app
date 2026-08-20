import { Component, ElementRef, ViewChild, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanApplicationComponent } from '../loan-application/loan-application';
import { DocumentUploadComponent } from '../document-upload/document-upload';

export type StepStatus = 'completed' | 'active' | 'pending';

export interface WizardStep {
  name: string;
  stage: number;
  status: StepStatus;
  route: string;
}

@Component({
  selector: 'app-business-details',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    LoanApplicationComponent, 
    DocumentUploadComponent
  ],
  templateUrl: './business-details.html',
  styleUrl: './business-details.css',
})
export class BusinessDetailsComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);

  @ViewChild('stepperTrack') stepperTrack?: ElementRef<HTMLDivElement>;

  refNumber: string = '1541544654666';
  businessForm!: FormGroup;
  expandedSection: string | null = null;

  steps: WizardStep[] = [
    { name: 'Verify Mobile Number', stage: 1, status: 'completed', route: '/verify-mobile-number' },
    { name: 'Loan Details', stage: 2, status: 'completed', route: '/loan-application' },
    { name: 'Document Upload', stage: 3, status: 'completed', route: '/document-upload' },
    { name: 'Business Details', stage: 4, status: 'active', route: '/business-details' },
    { name: 'Director Details', stage: 5, status: 'pending', route: '/director-details' },
    { name: "Director's Document Upload", stage: 6, status: 'pending', route: '/director-document-upload' },
    { name: 'Collateral Details', stage: 7, status: 'pending', route: '/collateral-details' },
    { name: 'Existing Loans/Obligations', stage: 8, status: 'pending', route: '/existing-loans-obligations' },
    { name: 'Terms And Conditions', stage: 9, status: 'pending', route: '/terms-and-conditions' },
    { name: 'Summary', stage: 10, status: 'pending', route: '/summary' },
    { name: 'Digital Signature', stage: 11, status: 'pending', route: '/digital-signature' },
  ];

  ngOnInit(): void {
    this.initForm();
  }

  toggleSection(sectionName: string): void {
    this.expandedSection = this.expandedSection === sectionName ? null : sectionName;
  }

  private initForm(): void {
    this.businessForm = this.fb.group({
      companyName: ['Rumango', Validators.required],
      companyType: ['', Validators.required],
      natureOfBusiness: ['', Validators.required],
      segment: ['', Validators.required],
      industrySector: ['Retail', Validators.required],
      numberOfDirectors: ['2', [Validators.required, Validators.min(1)]],
      countryOfIncorporation: ['', Validators.required],
      dateOfIncorporation: ['1997-07-24', Validators.required],
      registrationNumber: ['', Validators.required],
      tinNumber: [''],

      yearsInOperation: ['', Validators.required],
      numberOfEmployees: ['2', Validators.required],
      annualTurnover: ['', Validators.required],
      aveStockLevel: ['', Validators.required],
      telephone: ['1541544654666'],
      laborOrCapital: ['Labour', Validators.required],
      hasBankingRelationship: ['No', Validators.required],

      primaryContactName: ['Srihari', Validators.required],
      designationRole: ['', Validators.required],
      contactCountryCode: ['+91', Validators.required],
      contactPhoneNumber: ['', Validators.required],
      emailAddress: ['', [Validators.email]],
      businessAddress: ['Akshay Tech Park'],
      parentCompany: [''],

      customerDescription: [''],
      descriptionOfBusiness: ['']
    });
  }

  get progressPercent(): number {
    const activeIndex = this.steps.findIndex(s => s.status === 'active');
    if (activeIndex <= 0) return 0;
    return (activeIndex / (this.steps.length - 1)) * 100;
  }

  getStepIcon(status: StepStatus): string {
    switch (status) {
      case 'completed': return '✓';
      case 'active': return '◐';
      default: return '';
    }
  }

  navigateToStep(step: WizardStep): void {
    if (step.status === 'completed' || step.status === 'active') {
      this.router.navigate([step.route]);
    }
  }

  scrollStepper(direction: -1 | 1): void {
    const track = this.stepperTrack?.nativeElement;
    if (!track) return;
    track.scrollBy({ left: direction * 240, behavior: 'smooth' });
  }

  onBack(): void {
    this.router.navigate(['/document-upload']);
  }

  onNext(): void {
    if (this.businessForm.invalid) {
      this.businessForm.markAllAsTouched();
      return;
    }
    this.router.navigate(['/summary']);
  }
}