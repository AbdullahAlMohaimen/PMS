import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class User extends BasicBaseObject{
    constructor(){
        super();
      this.Id = 0;
      this.Name = "";
      this.Email = "";
      this.Password = "";
      this.Solt = "";
      this.LoginType ="";
      this.Language = "";
      this.AuthorizedDate = "";


        //this.menuStatus = EnumMenuStats.NotYetApprove;
    }
  Id: number;
  Name: string;
  Email: string;
  Password: string;
  Solt: string;
  LoginType: string;
  Language: string;
  AuthorizedDate: string;
}


