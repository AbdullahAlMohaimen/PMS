import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { SocialAuthService, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GoogleSigninButtonModule
  ],
  providers:[
    SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1089518169431-lo50dblmssjm6783tg5rp9uat8tau3sf.apps.googleusercontent.com'
            )
          }
        ],
        onError: (error) => {
          //console.error(error);
        }
    } as SocialAuthServiceConfig,},
  ]
})
export class PMSGoogleModule { }
