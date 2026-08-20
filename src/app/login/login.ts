import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']

})
export class LoginComponent {
  accountNumber: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onContinue() {
    this.errorMessage = '';
    
    // Account Number validation: Only digits, length 10 to 19
    const accountRegex = /^\d{10,19}$/;

    if (!this.accountNumber) {
      this.errorMessage = 'Please enter Account Number';
      return;
    }

    if (!accountRegex.test(this.accountNumber)) {
      this.errorMessage = 'Account number must be between 10 to 19 digits';
      return;
    }

    // Pass account number to OTP page
    this.router.navigate(['/otp'], { queryParams: { acc: this.accountNumber } });
  }
}