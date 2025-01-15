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
    private router: Router,
    private authenticationService : AuthenticationService,
    private apiService : ApiService,
    private authGuard : AUTHGUARD,
    private httpClient : HttpClient,
    private notification : NotificationService,
    private loading : LoadingService){
  }
  //#endregion

  loginForm! : FormGroup;
  oLoginRequest : LoginRequest = new LoginRequest();
  ngOnInit(){
    this.createForms();
    this.oLoginRequest = new LoginRequest();
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
    this.loading.IsLoginStart = true;
    this.oLoginRequest.isForSignIN = true;
    this.authenticationService.Login(this.oLoginRequest).subscribe(
      (resp: any) => {
      },
      (err: any) => {
        debugger;
        this.loading.IsLoginStart = false;
        this.notification.Error(err.error.message);
      },
      () => {
        this.loading.IsLoginStart = false;
        this.LOGIN();
    });
  }
  LOGIN(){
    const jwtHelper = new JwtHelperService();
    const currentUser = jwtHelper.decodeToken(localStorage.getItem('token') as any);
    if(currentUser !== null){
      this.router.navigate(['/pms-dashboard/dashboard']);
    }
  }
  forgetPasswordClick(){

  }
  signup(){
    this.router.navigate(['/pms-signup']);
  }
}
