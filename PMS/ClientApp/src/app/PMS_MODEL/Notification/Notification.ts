import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class Notification extends BasicBaseObject{
  constructor() {
    super();
    this.Id = 0;
    this.Message = "";
    this.Type = "";
    this.Status = "";
    this.CreatedAt = "";
    this.UserId = 0;

  }
  Id: number;
  Message: string;
  Type: string;
  Status: string;
  CreatedAt: string;
  UserId: number
}


