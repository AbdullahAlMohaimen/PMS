import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class Project extends BasicBaseObject{
  constructor() {
    super();
    this.name = "";
    this.description = "";
    this.status = "";
    this.startDate = "";
    this.endDate = "";
    this.teamId = 0;

  }
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  teamId: number
}
