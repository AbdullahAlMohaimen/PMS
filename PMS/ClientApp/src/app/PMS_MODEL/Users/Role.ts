import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class Role extends BasicBaseObject{
    constructor(){
        super();
      this.Id = 0;
      this.Name = "";
      this.Description = "";
    

        //this.menuStatus = EnumMenuStats.NotYetApprove;
    }
  Id: number;
  Name: string;
  Description: string;

}


