import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class TimeTracking extends BasicBaseObject{
    constructor(){
        super();
      this.startTime = "";
      this.endTime = "";
      this.notes = "";
      this.userId = 0;
      this.taskId = 0;
    }
  startTime: string;
  endTime: string;
  notes: string;
  userId: number;
  taskId: number;
}


