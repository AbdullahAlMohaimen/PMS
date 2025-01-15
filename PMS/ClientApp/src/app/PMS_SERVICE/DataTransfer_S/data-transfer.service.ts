import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class DataTransferService {
  private data: any;
  constructor() {
  }
  public getData(): any {
      return this.data;
  }
  public setData(data: any): void {
      this.data = data;
  }
  public resetData(): void {
      this.data = undefined;
  }
}

@Injectable()
export class PickerDataTransferService {

    dataChanged = new Subject<number>();
    constructor() {
    }
    changeId(id:number) {
        if (id != undefined) {
            this.dataChanged.next(id);
        }
    }

    unsubscribeId() {
       this.dataChanged.next(0);
    }  
}