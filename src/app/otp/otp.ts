import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './otp.html',
  styleUrls: ['./otp.css']
})
export class OtpComponent implements OnInit, OnDestroy {
  accountNo: string = '';
  otp: string = '';
  otpError: boolean = false;
  
  timerSeconds: number = 30;
  timerText: string = '0:30sec';
  intervalId: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.accountNo = params['acc'] || '546136451323';
    });
    this.startTimer();
  }

  startTimer(): void {
    this.timerSeconds = 30;
    this.updateTimerText();

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    // Angular NgZone me timer run karenge real-time update ke liye
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        if (this.timerSeconds > 0) {
          this.timerSeconds--;
          this.ngZone.run(() => {
            this.updateTimerText();
            this.cdRef.detectChanges(); // Force Real-time Screen Render
          });
        } else {
          clearInterval(this.intervalId);
        }
      }, 1000);
    });
  }

  updateTimerText(): void {
    const sec = this.timerSeconds < 10 ? `0${this.timerSeconds}` : `${this.timerSeconds}`;
    this.timerText = `0:${sec}sec`;
  }

  resendOtp(): void {
    if (this.timerSeconds === 0) {
      this.otpError = false;
      this.otp = '';
      this.startTimer();
    }
  }

  onVerify(): void {
    if (this.otp && this.otp.length >= 4) {
      this.otpError = false;
      // Navigate to your existing Loan Calculator page
      this.router.navigate(['/loan-calculator']);
    } else {
      this.otpError = true;
    }
  }

  goBack(): void {
   this.router.navigate(['./login'])
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}