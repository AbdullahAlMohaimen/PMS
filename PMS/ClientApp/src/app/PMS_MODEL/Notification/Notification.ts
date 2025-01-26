import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class Notification extends BasicBaseObject{
  constructor() {
    super();
    this.message = "";
    this.type = "";
    this.status = "";
    this.createdAt = "";
    this.userId = 0;

  }
  message: string;
  type: string;
  status: string;
  createdAt: string;
  userId: number
}


