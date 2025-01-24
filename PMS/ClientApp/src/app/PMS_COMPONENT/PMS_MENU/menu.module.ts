import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

import { AuthenticationService } from '../../PMS_SERVICE/Authentication_S/authentication.service';
import { LoadingService } from '../Loading/loading.service';
import { NotificationService } from '../../PMS_SERVICE/Notification_S/notification.service';
import { DataTransferService } from '../../PMS_SERVICE/DataTransfer_S/data-transfer.service';
import { LoadingModule } from '../Loading/loading.module';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuEntryComponent } from './menu-list/menu-entry/menu-entry.component';
import { MenuApprovalComponent } from './menu-approval/menu-approval.component';
import { MenuService } from '../../PMS_SERVICE/Menu_S/menu.service';


@NgModule({
  declarations: [
    MenuListComponent,
    MenuEntryComponent,
    MenuApprovalComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
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
    TableModule,
    ProgressSpinnerModule,
    DropdownModule,
    LoadingModule
  ],
  providers: [
    DatePipe,
    AuthenticationService,
    NotificationService,
    DataTransferService,
    LoadingService,
    MenuService
  ],
})
export class MenuModule { }
