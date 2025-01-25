import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class TimeTracking extends BasicBaseObject{
    constructor(){
        super();
      this.Id = 0;
      this.StartTime = "";
      this.EndTime = "";
      this.Notes = "";
      this.UserId = 0;
      this.TaskId = 0;
        //this.menuStatus = EnumMenuStats.NotYetApprove;
    }
  Id: number;
  StartTime: string;
  EndTime: string;
  Notes: string;
  UserId: number;
  TaskId: number;
}


