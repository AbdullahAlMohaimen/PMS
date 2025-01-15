import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PMSDashboardRoutingModule } from './pmsdashboard-routing.module';
import { PMSDashboardComponent } from './pmsdashboard/pmsdashboard.component';


@NgModule({
  declarations: [
    PMSDashboardComponent
  ],
  imports: [
    CommonModule,
    PMSDashboardRoutingModule
  ]
})
export class PMSDashboardModule { }
