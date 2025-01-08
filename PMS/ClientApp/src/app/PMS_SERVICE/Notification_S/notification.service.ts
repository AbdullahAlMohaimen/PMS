import { Injectable} from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() { }

  Success(message: string, title?: string) {
    this.SuccessExtra(message, title);
  }
  Error(message: string, title?: string) {
      this.ErrorExtra(message, title);
  }
  Warning(message: string, title?: string) {
      this.WarningExtra(message, title);
  }
  Information(message: string, title?: string) {
      this.InformationExtra(message, title);
  }
  Confirm(title: string, message: string): boolean {
    let isConfirm: boolean = true;
    Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0e2b63',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
        }
    })
    return isConfirm;
  }
  SuccessConfirm(message: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      Swal.fire({
        text: message,
        icon: 'success',
        confirmButtonColor: '#50af47',
        confirmButtonText: 'OK',
      }).then((result) => {
        const isConfirmed: boolean = result.isConfirmed;
        resolve(isConfirmed);
      });
    });
  }
  ActiveConfirm(title: string, message: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0e2b63',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        const isConfirmed: boolean = result.isConfirmed;
        resolve(isConfirmed);
      });
    });
  }
  WarningConfirmation(title: string, message: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0e2b63',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        const isConfirmed: boolean = result.isConfirmed;
        resolve(isConfirmed);
      });
    });
  }
  SuccessExtra(message: string, title?: string,
    disableTimeOut: boolean = false, timeOut: number = 4000, maxOpened: number = 3, tapToDismiss: boolean = true,
    progressBar: boolean = true, closeButton: boolean = true, positionClass: string = 'toast-top-center') {
    Swal.fire(title, message, 'success');
  }
  ErrorExtra(message: string, title?: string,
      disableTimeOut: boolean = false, timeOut: number = 4000, maxOpened: number = 3, tapToDismiss: boolean = true,
      progressBar: boolean = true, closeButton: boolean = true, positionClass: string = 'toast-top-center') {
      Swal.fire(title, message, 'error');
  }
  WarningExtra(message: string, title?: string,
      disableTimeOut: boolean = false, timeOut: number = 4000, maxOpened: number = 3, tapToDismiss: boolean = true,
      progressBar: boolean = true, closeButton: boolean = true, positionClass: string = 'toast-top-center') {
      Swal.fire(title, message, 'warning');
  }
  InformationExtra(message: string, title?: string,
      disableTimeOut: boolean = false, timeOut: number = 4000, maxOpened: number = 3, tapToDismiss: boolean = true,
      progressBar: boolean = true, closeButton: boolean = true, positionClass: string = 'toast-top-center') {
      Swal.fire(title, message, 'info');
  }
}
