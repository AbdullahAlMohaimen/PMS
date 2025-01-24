import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuListComponent } from './menu-list/menu-list.component';
import { AUTHGUARD } from '../../PMS_AUTHGUARD/AuthGuard';
import { MenuApprovalComponent } from './menu-approval/menu-approval.component';

const routes: Routes = [
  { path : 'pms-menu-list',component:MenuListComponent, canActivate:[AUTHGUARD]},
  { path : 'pms-menu-approval',component:MenuApprovalComponent, canActivate:[AUTHGUARD]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
