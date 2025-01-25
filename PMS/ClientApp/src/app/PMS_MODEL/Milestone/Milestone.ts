import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class Milestone extends BasicBaseObject{
  constructor() {
    super();
    this.Id = 0;
    this.Title = "";
    this.Description = "";
    this.Deadline = "";
    this.ProjectId = 0;

  }
  Id: number;
  Title: string;
  Description: string;
  Deadline: string;
  ProjectId: number;
}



