import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './loading.service';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    DialogModule
  ],
  providers: [
    LoadingService
  ],
  exports: [
    LoadingComponent
  ]
})
export class LoadingModule { }
