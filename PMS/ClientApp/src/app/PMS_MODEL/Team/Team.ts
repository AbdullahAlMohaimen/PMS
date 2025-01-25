import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class Team extends BasicBaseObject {
  constructor() {
    super();
    this.Id = 0;
    this.Name = "";
    this.Description = "";
   
  }
  Id: number;
  Name: string;
  Description: string;


}
