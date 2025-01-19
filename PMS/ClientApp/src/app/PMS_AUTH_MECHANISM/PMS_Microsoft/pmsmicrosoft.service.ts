import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '../../PMS_MODEL/Authentication/login-request';
import { AccountInfo } from '@azure/msal-browser';
import { AuthenticationResult } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class PMSMicrosoftService {
  constructor(private http: HttpClient,
    public apiService: ApiService,
    private router: Router, 
    private msalService: MsalService) { 
  }

  private userProfileSubject = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject.asObservable();

  TriggerSSOLogin() {
    setTimeout(() => {
      this.msalService.loginRedirect();
    }, 0);
  }
  RedirectResponse_SSO(): void {
    this.msalService.handleRedirectObservable().subscribe({next: (response: AuthenticationResult | null) => {
      if (response) {
        localStorage.removeItem('pms_google_user');
        localStorage.removeItem('pms_microsoft_user');
        this.msalService.instance.setActiveAccount(response.account);
        const loginRequest = new LoginRequest();
        loginRequest.populateFromSSOForMicrosoft(response.account);
        this.SETUserProfile_SSO(loginRequest);
        localStorage.setItem('pms_microsoft_user', JSON.stringify(response.account));
      }
    },
    error: (error) => {
      console.error('Error handling redirect:', error);
    },
    });
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      localStorage.removeItem('pms_google_user');
      localStorage.removeItem('pms_microsoft_user');
      this.msalService.instance.setActiveAccount(accounts[0]);
      const loginRequest = new LoginRequest();
      loginRequest.populateFromSSOForMicrosoft(accounts[0]);
      this.SETUserProfile_SSO(loginRequest);
      localStorage.setItem('pms_microsoft_user', JSON.stringify(accounts[0]));
    }
  }
  private SETUserProfile_SSO(profile: LoginRequest): void {
    this.userProfileSubject.next(profile);
  }
  GETUserProfile_SSO(): Observable<LoginRequest> {
    return this.userProfile$;
  }
}
