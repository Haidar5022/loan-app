import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('accessToken');
    const tokenType = sessionStorage.getItem('tokenType') || 'Bearer';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `${tokenType} ${token}` } : {})
    });
  }

  signInWebsiteUser(): Observable<any> {
    const payload = { username: 'WEBSITE', password: 'Newuser@1' };
    return this.http.post<any>('https://192.168.0.29:8766/auth/signin', payload).pipe(
      tap((res: any) => {
        if (res?.accessToken) {
          sessionStorage.setItem('accessToken', res.accessToken);
          sessionStorage.setItem('tokenType', res.tokenType || 'Bearer');
        }
      })
    );
  }

  generateOtp(accountNumber: string): Observable<any> {
    const payload = { mobile: accountNumber };
    return this.http.post<any>('https://192.168.0.29:8766/auth/generateOtp', payload, {
      headers: this.getAuthHeaders()
    });
  }

  verifyOtp(accountNumber: string, otp: string): Observable<any> {
    const payload = { 
      mobile: accountNumber, 
      otp: otp 
    };
    return this.http.post<any>('https://192.168.0.29:8766/auth/verifyOtp', payload, {
      headers: this.getAuthHeaders()
    });
  }

  // Exact Postman structure ke according method
  calculateLoan(amount: number, months: number, rate: number = 10): Observable<any> {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    const payload = {
      principleAmount: amount,
      interestRate: rate,
      numberOfMonths: months,
      firstRepaymentDate: formattedDate
    };

    return this.http.post<any>('https://192.168.0.29:8766/loan-repayment/emi-calculation', payload, {
      headers: this.getAuthHeaders()
    });
  }
}