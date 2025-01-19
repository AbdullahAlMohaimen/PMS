import { Component, OnInit ,Renderer2} from '@angular/core';
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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  animations: [
    trigger('slideInAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(10px)', opacity: 0 }),
        animate('0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class SignupComponent implements OnInit{
  //#region constructor
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService : AuthenticationService,
    private apiService : ApiService,
    private authGuard : AUTHGUARD,
    private httpClient : HttpClient,
    private notification : NotificationService,
    private loading : LoadingService,private renderer: Renderer2){
  }
  //#endregion

  loginForm! : FormGroup;
  oLoginRequest : LoginRequest = new LoginRequest();
  createForms(){
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  ngOnInit(){
    this.createForms();
    this.oLoginRequest = new LoginRequest();
  }
  onSubmit() {
    if(this.oLoginRequest.userName === null || this.oLoginRequest.userName === undefined || this.oLoginRequest.userName === ""){
      this.notification.Warning("Please enter your User Name!","Warning");
      return;
    }
    if(this.oLoginRequest.email === null || this.oLoginRequest.email === undefined || this.oLoginRequest.email === ""){
      this.notification.Warning("Please enter your EMAIL!","Warning");
      return;
    }
    if(this.oLoginRequest.password === null || this.oLoginRequest.password === undefined || this.oLoginRequest.password === ""){
      this.notification.Warning("Please enter your PASSWORD","Warning");
      return;
    }
    if(this.oLoginRequest.confirmPassword === null || this.oLoginRequest.confirmPassword === undefined || this.oLoginRequest.confirmPassword === ""){
      this.notification.Warning("Please enter CONFIRM PASSWORD","Warning");
      return;
    }
    if(this.oLoginRequest.password !== this.oLoginRequest.confirmPassword){
      this.notification.Warning("Uh-oh! Your passwords don’t match. Please double-check and try again.","Warning");
      return;
    }
    debugger;
    this.loading.IsLoginStart = true;
    this.oLoginRequest.isForSignIN = false;
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
    this.authenticationService.Login(this.oLoginRequest).subscribe(
      (resp: any) => {
      },
      (err: any) => {
        localStorage.removeItem('pms_google_user');
        localStorage.removeItem('pms_microsoft_user');
        localStorage.removeItem('pms_normal_user');
        this.loading.IsLoginStart = false;
        this.notification.Error(err);
        this.notification.Error(err.error.message);
      },
      () => {
        this.loading.IsLoginStart = false;
        this.LOGIN();
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
  signin(){
    this.router.navigate(['/pms-login']);
  }
}
