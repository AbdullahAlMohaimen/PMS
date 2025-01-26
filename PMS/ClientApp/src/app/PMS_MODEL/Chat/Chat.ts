import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class Chat extends BasicBaseObject {
  constructor() {
    super();
    this.message = "";
    this.timestamp = "";
    this.senderId = "";
    this.receiverId = 0;
  }
  message: string;
  timestamp: string;
  senderId: string;
  receiverId: number;
}


