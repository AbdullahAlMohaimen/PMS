import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { AuthenticationService } from '../../../PMS_SERVICE/Authentication_S/authentication.service';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(public authService: AuthenticationService,public apiService : ApiService) {
    debugger;
    if(this.authService.ISAlreadySSOLogin() === "NoLogin"){
      this.authService.Logout();
    }
    else{
      this.authService.Logout();
    }
  }
  isMenuVisible: boolean = false;

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
