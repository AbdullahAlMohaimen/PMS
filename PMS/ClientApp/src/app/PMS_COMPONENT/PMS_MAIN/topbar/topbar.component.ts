import { Component, OnInit} from '@angular/core';
import { MainComponent } from '../Main/main.component';
import { AppComponent } from '../../../app.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from '../../../api.service';
import { AUTHGUARD } from '../../../PMS_AUTHGUARD/AuthGuard';
import { AuthenticationService } from '../../../PMS_SERVICE/Authentication_S/authentication.service';
import { LoadingService } from '../../Loading/loading.service';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit{

  constructor(public apiService:ApiService,
              public appMain : MainComponent,
              public authGuard : AUTHGUARD, 
              public authenticationService : AuthenticationService,
              public loading : LoadingService){
    this.authGuard.loginEvent.subscribe(value => this.getloginUserInformation());
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD){
      this.getloginUserInformation();
    }
  }
  currentUserName : string = "";
  ngOnInit() {

  }
  getloginUserInformation(){
    const jwtHelper = new JwtHelperService();
    const currentUser = jwtHelper.decodeToken(localStorage.getItem('token') as any);
    if(currentUser === undefined || currentUser === null){
      return;
    }
    else{
      this.currentUserName = currentUser.Name;
    }
  }
  signOut(){
    this.loading.IsLoginStart = true;
    this.authenticationService.UserLogOut().subscribe(
      (resp: any) => {
      },
      (err: any) => {
        this.loading.IsLoginStart = false;
      },
      () => {
        this.loading.IsLoginStart = false;
        this.authenticationService.Logout();
    });
  }
}
