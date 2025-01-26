import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class Resource extends BasicBaseObject{
  constructor() {
    super();
    this.name = "";
    this.type = "";
    this.url = "";
    this.projectId = 0;
  }
  name: string;
  type: string;
  url: string;
  projectId: number;
}
