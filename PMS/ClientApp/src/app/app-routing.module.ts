import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './PMS_COMPONENT/PMS_LOGIN/login/login.component';
import { SignupComponent } from './PMS_COMPONENT/PMS_LOGIN/signup/signup.component';
import { ErrorComponent } from './PMS_COMPONENT/error/error.component';

const routes: Routes = [
  { path: 'pms-login', component: LoginComponent, data: {title: 'Login' }},
  { path: 'pms-signup', component: SignupComponent, data: {title: 'Signup' }},
  { path: 'pms-dashboard', loadChildren: () => import('./PMS_COMPONENT/PMS_DASHBOARD/pmsdashboard.module').then(m => m.PMSDashboardModule)},
  { path: '', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
