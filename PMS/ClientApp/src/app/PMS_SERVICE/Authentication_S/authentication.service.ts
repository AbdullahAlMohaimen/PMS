import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginRequest } from '../../PMS_MODEL/Authentication/login-request';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient,
    public apiService: ApiService,
    private router: Router) { 
  }
  private serviceName = "/Authentication/";
  jwtHelper = new JwtHelperService();

  Login(loginRequest : LoginRequest){
    return this.http.post(this.apiService.BASE_URL + this.serviceName + 'login', loginRequest).pipe(
      map((response:any) => {
        const oUser = response; 
        if(oUser){
          localStorage.setItem('pms_token', oUser);
          ApiService.AuthenticationToken = oUser;
        }
    }));
  }
  IsLoggedIn() {
    const token = localStorage.getItem('pms_token');
    ApiService.AuthenticationToken = token ? token : '';
    return !this.jwtHelper.isTokenExpired(token);
  }
  ISAlreadySSOLogin():string{
    const satoreGoogleUser = localStorage.getItem('pms_google_user');
    const storeMicrosoftUser = localStorage.getItem('pms_microsoft_user');
    const storeNormalUser = localStorage.getItem('pms_normal_user');
    if(satoreGoogleUser !== null){
      if(satoreGoogleUser !== "null"){
        return "GoogleLogin";
      }
    }
    if(storeMicrosoftUser !== null){
      if(storeMicrosoftUser !== "null"){
        return "MicrosoftLogin";
      }
    }
    if(storeNormalUser !== null){
      if(storeNormalUser !== "null"){
        return "MicrosoftLogin";
      }
    }
    return "NoLogin";
  }
  UserLogOut(){
    return this.apiService.HttpGet(this.serviceName + 'LogOut');
  }
  Logout() {
    localStorage.removeItem('pms_token');
    this.router.navigate(['/pms-login']);
  }
}
