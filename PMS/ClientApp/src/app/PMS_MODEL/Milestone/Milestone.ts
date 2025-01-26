import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class Milestone extends BasicBaseObject{
  constructor() {
    super();
    this.title = "";
    this.description = "";
    this.deadline = "";
    this.projectId = 0;

  }
  title: string;
  description: string;
  deadline: string;
  projectId: number;
}



