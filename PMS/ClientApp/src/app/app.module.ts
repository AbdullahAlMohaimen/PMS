import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { HashLocationStrategy } from '@angular/common';
import { LocationStrategy } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { FullCalendarModule } from '@fullcalendar/angular';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { EditorModule } from 'primeng/editor';
import { SpinnerModule } from 'primeng/spinner';
import { ToastrModule } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RippleModule } from 'primeng/ripple';
import { MsalGuard } from '@azure/msal-angular';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

//#region FOR S_S_O
import {
  MsalModule,
  MsalInterceptor,
  MsalService,
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalInterceptorConfiguration,
  MsalRedirectComponent,
} from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
export const MSALInstance = new PublicClientApplication({
  auth: {
      clientId: '30d68a3f-aac0-4ac2-9876-79b1af89aff4',
      authority: 'https://login.microsoftonline.com/0ccbbd58-9cd0-415c-a100-c6ac318a5a14',
      redirectUri: 'http://localhost:4200',
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
//#endregion

import { AuthenticationService } from './PMS_SERVICE/Authentication_S/authentication.service';
import { NotificationService } from './PMS_SERVICE/Notification_S/notification.service';
import { MainComponent } from './PMS_COMPONENT/PMS_MAIN/Main/main.component';
import { LoadingModule } from './PMS_COMPONENT/Loading/loading.module';
import { LoadingService } from './PMS_COMPONENT/Loading/loading.service';
import { TopbarComponent } from './PMS_COMPONENT/PMS_MAIN/topbar/topbar.component';
import { FooterComponent } from './PMS_COMPONENT/PMS_MAIN/footer/footer.component';
import { MenuComponent } from './PMS_COMPONENT/PMS_MAIN/menu/menu.component';
import { LoginComponent } from './PMS_COMPONENT/PMS_LOGIN/login/login.component';
import { SignupComponent } from './PMS_COMPONENT/PMS_LOGIN/signup/signup.component';
import { ErrorComponent } from './PMS_COMPONENT/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TopbarComponent,
    FooterComponent,
    MenuComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
    ButtonModule,
    ContextMenuModule,
    FullCalendarModule,
    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    PanelMenuModule,
    RadioButtonModule,
    RippleModule,
    ScrollPanelModule,
    SlideMenuModule,
    SliderModule,
    StepsModule,
    TabMenuModule,
    TieredMenuModule,
    NgxExtendedPdfViewerModule,
    EditorModule,
    SpinnerModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
    PdfViewerModule,
    CommonModule,
    PanelModule,
    TabViewModule,
    NgxExtendedPdfViewerModule,
    DialogModule,
    ProgressSpinnerModule,
    LoadingModule,
    ToastrModule.forRoot({
      timeOut: 8000,
      positionClass: 'toast-top-center',
      preventDuplicates: false,
    }),
    MsalModule.forRoot(MSALInstance, MSALGuardConfig, MSALInterceptorConfig),
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    MsalService,
    DatePipe,
    AuthenticationService,
    NotificationService,
    LoadingService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule {
  constructor(public authService: AuthenticationService){
    this.overrideDate();
  }
  overrideDate() {
    Date.prototype.toJSON = function(key) {
        return this.toLocaleDateString('en-US') + ' ' + this.toLocaleTimeString('en-US');
    };
  }
}
