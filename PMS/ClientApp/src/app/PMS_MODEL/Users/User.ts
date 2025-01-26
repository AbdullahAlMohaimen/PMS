import { BasicBaseObject } from "../Basic/BasicBaseObject";

export class User extends BasicBaseObject{
    constructor(){
        super();
      this.name = "";
      this.email = "";
      this.password = "";
      this.solt = "";
      this.loginType ="";
      this.language = "";
      this.authorizedDate = "";
  }
  name: string;
  email: string;
  password: string;
  solt: string;
  loginType: string;
  language: string;
  authorizedDate: string;
}


