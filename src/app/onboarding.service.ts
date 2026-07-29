import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  private accountNo = '';

  setAccountNo(value: string): void {
    this.accountNo = value;
  }

  getAccountNo(): string {
    return this.accountNo;
  }
}