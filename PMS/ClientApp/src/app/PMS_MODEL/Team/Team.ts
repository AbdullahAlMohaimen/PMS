import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class Team extends BasicBaseObject {
  constructor() {
    super();
    this.name = "";
    this.description = "";
   
  }
  name: string;
  description: string;
}
