import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './confirmation.html',
  styleUrls: ['./confirmation.css']
})
export class ConfirmationComponent implements OnInit {
  activeTab: 'basic' | 'address' = 'basic';
  detailsForm!: FormGroup;

  titles = ['Mr', 'Mrs', 'Ms', 'Dr'];
  genders = ['Male', 'Female', 'Other'];
  nationalities = ['Kenyan', 'Indian', 'American', 'British'];
  maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
  countryCodes = ['+91', '+254', '+1', '+44'];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      title: ['Mr', Validators.required],
      firstName: ['Rajesh', Validators.required],
      middleName: ['Sharma'],
      lastName: ['G', Validators.required],
      dateOfBirth: ['1996-06-24', Validators.required],
      gender: ['Male', Validators.required],
      idNumber: ['9876543678', Validators.required],
      nationality: ['Kenyan', Validators.required],
      countryOfResidence: ['Kenyan', Validators.required],
      maritalStatus: ['Single', Validators.required],
      countryCode: ['+91', Validators.required],
      mobileNumber: ['9003048125', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['sri@gmail.com', [Validators.required, Validators.email]]
    });
  }

  setTab(tab: 'basic' | 'address'): void {
    this.activeTab = tab;
  }

  verifyOtp(): void {
    console.log('Verifying OTP for:', this.detailsForm.get('email')?.value);
  }

  onBack(): void {
   this.router.navigate(['./summary']);
  }

  onSaveDraft(): void {
    // console.log('Saving draft:', this.detailsForm.value);
  alert('Draft Saved')
  }

  onContinue(): void {
    // this.router.navigate(['/']);
    alert ('Data is saved Successfully');
  }
}