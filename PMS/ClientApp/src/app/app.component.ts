import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { ApiService } from './api.service';
import { AuthenticationService } from './PMS_SERVICE/Authentication_S/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  userProfile: any = null;

  constructor(private msalService: MsalService, private apiService: ApiService,private authService: AuthenticationService) {}

  ngOnInit() {
  }
}
