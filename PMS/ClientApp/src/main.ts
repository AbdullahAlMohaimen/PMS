import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration
} from '@azure/msal-angular';
import {LogLevel, PublicClientApplication} from '@azure/msal-browser';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));