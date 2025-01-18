import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalModule,MsalInterceptor,MsalService,
  MsalGuardConfiguration,MSAL_GUARD_CONFIG,MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,MsalInterceptorConfiguration,
  MsalRedirectComponent} from '@azure/msal-angular';

import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PMSMicrosoftService } from './pmsmicrosoft.service';

export const MSALInstance = new PublicClientApplication({
  auth: {
      clientId: '736346b7-ac8e-4fb7-bf45-b08130024334',
      authority: 'https://login.microsoftonline.com/0ccbbd58-9cd0-415c-a100-c6ac318a5a14',
      redirectUri: 'http://localhost:4200/pms-login',
  },
  cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false,
  },
});
export const MSALGuardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Redirect,
  authRequest: {
      scopes: ['User.Read'],
  },
};
export const MSALInterceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Redirect,
  protectedResourceMap: new Map([
      ['https://graph.microsoft.com/v1.0/me', ['User.Read']],
  ]),
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MsalModule.forRoot(MSALInstance, MSALGuardConfig, MSALInterceptorConfig),
  ],
  providers:[{
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    MsalService,
    PMSMicrosoftService
  ],
  bootstrap: [MsalRedirectComponent]
})
export class PMSMicrosoftModule { }
