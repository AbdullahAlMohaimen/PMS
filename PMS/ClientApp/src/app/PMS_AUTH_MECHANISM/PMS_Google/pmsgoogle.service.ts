import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '../../PMS_MODEL/Authentication/login-request';
import { AccountInfo } from '@azure/msal-browser';
import { AuthenticationResult } from '@azure/msal-browser';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class PMSGoogleService {
  constructor(private http: HttpClient,
    public apiService: ApiService,
    private router: Router,private authServiced: SocialAuthService) { 
  }

  private userProfileSubject = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject.asObservable();
  RedirectResponse_SSO(user : SocialUser): void {
    const loginRequest = new LoginRequest();
    loginRequest.populateFromSSOForGoogle(user);
    this.SETUserProfile_SSO(loginRequest);
  }
  private SETUserProfile_SSO(profile: LoginRequest): void {
    this.userProfileSubject.next(profile);
  }
  GETUserProfile_SSO(): Observable<LoginRequest> {
    return this.userProfile$;
  }
}
