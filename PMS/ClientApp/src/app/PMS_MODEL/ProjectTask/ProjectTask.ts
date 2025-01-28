import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class ProjectTask extends BasicBaseObject{
  constructor() {
    super();
    this.title = "";
    this.description = "";
    this.status = "";
    this.deadline = "";
    this.projectId = 0;
    this.parentTaskId = 0;
  }
  title: string;
  description: string;
  status: string;
  deadline: string;
  projectId: number;
  parentTaskId: number;
}


