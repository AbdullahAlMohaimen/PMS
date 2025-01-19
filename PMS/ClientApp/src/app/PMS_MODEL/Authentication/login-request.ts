import { EnumLoginType } from "../Enum";

export class LoginRequest {
    email: string = '';
    userName: string = '';
    password: string = '';
    confirmPassword: string = '';
    isForSignIN : boolean = true;
	isSSO : boolean = false;
    authorityType?: EnumLoginType = EnumLoginType.Normal;

    populateFromSSOForMicrosoft(account: any): void {
		this.email = account.username;
		this.userName = account.name;
		this.authorityType = EnumLoginType.Microsoft;
	}
	populateFromSSOForGoogle(account: any): void {
		this.email = account.email;
		this.userName = account.name;
		this.authorityType = EnumLoginType.Google;
	}
	populateFromSSOForNormal(account: any): void {
		this.email = account.email;
		this.userName = account.name;
		this.authorityType = EnumLoginType.Normal;
	}
}