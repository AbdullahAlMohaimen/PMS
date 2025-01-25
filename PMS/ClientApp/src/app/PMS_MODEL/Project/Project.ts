import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class Project extends BasicBaseObject{
  constructor() {
    super();
    this.Id = 0;
    this.Name = "";
    this.Description = "";
    this.Status = "";
    this.StartDate = "";
    this.EndDate = "";
    this.TeamId = 0;

  }
  Id: number;
  Name: string;
  Description: string;
  Status: string;
  StartDate: string;
  EndDate: string;
  TeamId: number
  
}
