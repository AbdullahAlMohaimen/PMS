import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class Resource extends BasicBaseObject{
  constructor() {
    super();
    this.Id = 0;
    this.Name = "";
    this.Type = "";
    this.Url = "";
    this.ProjectId = 0;
  }

  Id: number;
  Name: string;
  Type: string;
  Url: string;
  ProjectId: number;
}
