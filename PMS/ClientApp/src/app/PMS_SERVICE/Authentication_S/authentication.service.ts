import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, AccountInfo } from '@azure/msal-browser';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient,
    public apiService: ApiService,
    private router: Router, 
    private msalService: MsalService) { 
  }
  private serviceName = "/Authentication/";
  jwtHelper = new JwtHelperService();
}
