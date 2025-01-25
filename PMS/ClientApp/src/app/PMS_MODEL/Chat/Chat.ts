import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class Chat extends BasicBaseObject {
  constructor() {
    super();
    this.Id = 0;
    this.Message = "";
    this.Timestamp = "";
    this.SenderId = "";
    this.ReceiverId = 0;
    //this.menuStatus = EnumMenuStats.NotYetApprove;
  }
  Id: number;
  Message: string;
  Timestamp: string;
  SenderId: string;
  ReceiverId: number;

}


