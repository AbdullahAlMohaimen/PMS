import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class ProjectTask extends BasicBaseObject{
  constructor() {
    super();
    this.Id = 0;
    this.Title = "";
    this.Description = "";
    this.Status = "";
    this.Deadline = "";
    this.ProjectId = 0;
    this.ParentTaskId = 0;
  }

  Id: number;
  Title: string;
  Description: string;
  Status: string;
  Deadline: string;
  ProjectId: number;
  ParentTaskId: number;
}


