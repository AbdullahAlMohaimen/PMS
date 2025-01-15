import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PMSDashboardComponent } from './pmsdashboard/pmsdashboard.component';
import { AUTHGUARD } from '../../PMS_AUTHGUARD/AuthGuard';

const routes: Routes = [
  { path : 'dashboard',component:PMSDashboardComponent, canActivate:[AUTHGUARD]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PMSDashboardRoutingModule { }
