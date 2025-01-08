import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor() { 
    this.IsLoginStart = false;
  }
  public IsLoginStart : boolean;
}
