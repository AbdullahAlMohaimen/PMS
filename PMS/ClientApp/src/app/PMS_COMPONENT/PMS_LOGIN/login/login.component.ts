import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../../../PMS_SERVICE/Authentication_S/authentication.service';
import { ApiService } from '../../../api.service';
import { AUTHGUARD } from '../../../PMS_AUTHGUARD/AuthGuard';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../PMS_SERVICE/Notification_S/notification.service';
import { LoadingService } from '../../Loading/loading.service';
import { LoginRequest } from '../../../PMS_MODEL/Authentication/login-request';
import { trigger, style, animate, transition } from '@angular/animations';

import { PMSMicrosoftService } from '../../../PMS_AUTH_MECHANISM/PMS_Microsoft/pmsmicrosoft.service';
import { Subscription } from 'rxjs';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { PMSGoogleService } from '../../../PMS_AUTH_MECHANISM/PMS_Google/pmsgoogle.service';
import { MsalService } from '@azure/msal-angular';
import { MenuService } from '../../../PMS_SERVICE/Menu_S/menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('slideInAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(10px)', opacity: 0 }),
        animate('0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit{
  //#region constructor
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,private msalService: MsalService,
    private authenticationService : AuthenticationService,
    private apiService : ApiService,
    private authGuard : AUTHGUARD,
    private httpClient : HttpClient,
    private notification : NotificationService,
    private pmsMicrosoftService : PMSMicrosoftService,
    private pmsGoogleService : PMSGoogleService,
    private loading : LoadingService,private googleAuthService: SocialAuthService,
    private menuService : MenuService ){
  }
  //#endregion

  loginForm! : FormGroup;
  oLoginRequest : LoginRequest = new LoginRequest();
  authSubscription!: Subscription;
  loginRequest : LoginRequest | undefined;
  isShow : boolean = true;
  ngOnInit(){
    this.createForms();
    this.oLoginRequest = new LoginRequest();
    if(this.authenticationService.ISAlreadySSOLogin() === "NoLogin"){
      this.isShow = true;
    }
    else{
      this.isShow = false;
    }
    //#region FOR GOOGLE
    const googleStroedUser = localStorage.getItem('pms_google_user');
    if(googleStroedUser === "null" || googleStroedUser === null){
      this.googleAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
      this.authSubscription = this.googleAuthService.authState.subscribe((user) => {
        if(user !== null){
          localStorage.removeItem('pms_microsoft_user');
          localStorage.removeItem('pms_google_user');
          localStorage.removeItem('pms_normal_user');
          localStorage.setItem('pms_google_user', JSON.stringify(user));
        }
        const storedGoogleUser = localStorage.getItem('pms_google_user'); 
        if(storedGoogleUser !== "null" && storedGoogleUser !== null){
          const googleUser : SocialUser = JSON.parse(storedGoogleUser);
          if(googleUser !== null){
            this.pmsGoogleService.RedirectResponse_SSO(googleUser);
            this.pmsGoogleService.GETUserProfile_SSO().subscribe((oRequest: LoginRequest) => {
              if (oRequest) {
                this.loginRequest = oRequest;
              }
              if(this.loginRequest !== undefined && this.loginRequest.email !== ""){
                this.UserLogin(this.loginRequest);
              }
            });
          }
        }
      });
    }
    else{
      const storedGoogleUser : SocialUser = JSON.parse(googleStroedUser);
      if(storedGoogleUser !== null){
        this.pmsGoogleService.RedirectResponse_SSO(storedGoogleUser);
        this.pmsGoogleService.GETUserProfile_SSO().subscribe((oRequest: LoginRequest) => {
          if (oRequest) {
            this.loginRequest = oRequest;
          }
          if(this.loginRequest !== undefined && this.loginRequest.email !== ""){
            this.UserLogin(this.loginRequest);
          }
        });
      }
    }
    //#endregion

    //#region FOR MICROSOFT
    this.pmsMicrosoftService.RedirectResponse_SSO();
    this.pmsMicrosoftService.GETUserProfile_SSO().subscribe((oRequest: LoginRequest) => {
      if (oRequest) {
        this.loginRequest = oRequest;
      }
      else{
        this.loginRequest = undefined;
      }
      if(this.loginRequest !== undefined && this.loginRequest.email !== ""){
        localStorage.removeItem('pms_google_user');
        localStorage.removeItem('pms_normal_user');
        this.UserLogin(this.loginRequest);
      }
    });
    //#endregion
  
    //#region FOR NORMAL LOGIN
    const storedNormalUser = localStorage.getItem('pms_normal_user'); 
    if(storedNormalUser !== "null" && storedNormalUser !== null){
      const normalUser : LoginRequest = JSON.parse(storedNormalUser);
      if(normalUser != null){
        this.UserLogin(normalUser);
      }
    }
    //#endregion
  }
  createForms(){
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit(){
    if(this.oLoginRequest.email === null || this.oLoginRequest.email === undefined || this.oLoginRequest.email === ""){
      this.notification.Warning("Please enter your EMAIL!","Warning");
      return;
    }
    if(this.oLoginRequest.password === null || this.oLoginRequest.password === undefined || this.oLoginRequest.password === ""){
      this.notification.Warning("Please enter your PASSWORD","Warning");
      return;
    }
    this.oLoginRequest.isForSignIN = true;
    this.oLoginRequest.isSSO = false;
    localStorage.removeItem('pms_google_user');
    localStorage.removeItem('pms_microsoft_user');
    localStorage.removeItem('pms_normal_user');
    const oLoginRequestForStore : LoginRequest = new LoginRequest();
    if(this.oLoginRequest !== undefined && this.oLoginRequest.email !== ""){
      oLoginRequestForStore.userName = this.oLoginRequest.userName;
      oLoginRequestForStore.email = this.oLoginRequest.email;
      oLoginRequestForStore.password = "";
      oLoginRequestForStore.confirmPassword = "";
      oLoginRequestForStore.isForSignIN = true;
      oLoginRequestForStore.isSSO = true;
    }
    localStorage.setItem('pms_normal_user', JSON.stringify(oLoginRequestForStore));
    this.UserLogin(this.oLoginRequest);
  }
  UserLogin(loginRequest : LoginRequest){
    this.loading.IsLoginStart = true;
    this.authenticationService.Login(loginRequest).subscribe(
      (resp: any) => {
      },
      (err: any) => {
        // localStorage.removeItem('pms_google_user');
        // localStorage.removeItem('pms_microsoft_user');
        // localStorage.removeItem('pms_normal_user');
        this.loading.IsLoginStart = false;
        this.notification.Error(err.error.message);
      },
      () => {
        this.loading.IsLoginStart = false;
        const jwtHelper = new JwtHelperService();
        const currentUser = jwtHelper.decodeToken(localStorage.getItem('pms_token') as any);
        if(currentUser.ID === "7"){
          this.apiService.IsAdmin = true;
          //localStorage.removeItem('pms_menuList');
          this.menuService.GetCurrentUserMenus().subscribe(
            (resp: any) => {
              localStorage.setItem('pms_menuList', JSON.stringify(resp));
            },
            (err: any) => {
            },
            () => {
              this.authGuard.loginEvent.emit(true);
              this.LOGIN();
          });
        }
        else{
          this.LOGIN();
        }
    });
  }
  LOGIN(){
    const jwtHelper = new JwtHelperService();
    const currentUser = jwtHelper.decodeToken(localStorage.getItem('pms_token') as any);
    if(currentUser !== null){
      this.router.navigate(['/pms-dashboard/dashboard']);
    }
  }
  forgetPasswordClick(){

  }
  signup(){
    this.router.navigate(['/pms-signup']);
  }

  login() {
    this.msalService.loginRedirect();
  }
  logout() {
    this.msalService.logoutRedirect();
  }
}
