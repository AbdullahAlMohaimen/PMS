import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class UserRole extends BasicBaseObject{
    constructor(){
        super();
      this.Id = 0;
      this.RoleId = 0;
      this.UserId = 0;

        //this.menuStatus = EnumMenuStats.NotYetApprove;
    }
  Id: number;
  RoleId: number;
  UserId: number;

}


