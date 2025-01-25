import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../../../PMS_SERVICE/Authentication_S/authentication.service';
import { ApiService } from '../../../../api.service';
import { NotificationService } from '../../../../PMS_SERVICE/Notification_S/notification.service';
import { Menu } from '../../../../PMS_MODEL/Menu/menu';
import { EnumMenyType } from '../../../../PMS_GLOBAL/Enum';
import { MenuService } from '../../../../PMS_SERVICE/Menu_S/menu.service';
import { LoadingService } from '../../../Loading/loading.service';

@Component({
  selector: 'app-menu-entry',
  templateUrl: './menu-entry.component.html',
  styleUrl: './menu-entry.component.scss'
})
export class MenuEntryComponent implements OnInit{
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService : AuthenticationService,
    private apiService : ApiService,
    private httpClient : HttpClient, 
    private notification : NotificationService,
    private menuService : MenuService,
    private loading : LoadingService){
  }
  menuTypes : any [] = [
    { name: 'Parent', value: EnumMenyType.Parent },
    { name: 'Child', value: EnumMenyType.Child },
  ];
  currentMenu : Menu = new Menu();
  selectedMenuType: EnumMenyType | undefined = undefined;
  isParent : boolean = true;
  parentID : number = 0;
  menuKey : string = "";
  allMenus : Menu[] = [];
  oSelectedParentMenu : Menu = new Menu();
  selectedParent : number | undefined = undefined;
  menuDescription : string = "";

  @Output() cancel = new EventEmitter<any>();
  @Input()
  public set GetMenu(oMenu: Menu) {
    this.currentMenu = oMenu;
  }
  ngOnInit(){
    this.loading.IsLoginStart = true;
      this.menuService.GetAllMenu().subscribe(
        (resp: any) => {
          this.allMenus = resp;
        },
        (err: any) => {
          this.loading.IsLoginStart = false;
          this.notification.Error(err.error.message);
        },
        () => {
          this.loading.IsLoginStart = false;
          if(this.allMenus.length > 0){
            this.allMenus.forEach(x=>{
            x.customMenuName = x.menuKey + " - " + x.menuName;
          });
        }
        if(this.currentMenu.id !== undefined && this.currentMenu.id !== 0){
        if(this.currentMenu.menuParentID === 0){
          this.menuDescription = "Parent";
          this.isParent = true;
          this.selectedMenuType = EnumMenyType.Parent;
        }
        else{
          this.isParent = false;
          this.menuDescription = "Child";
          this.selectedMenuType = EnumMenyType.Child;
          this.selectedParent = this.currentMenu.menuParentID;
        }
      }
    });
  }
  onMenuTypeChange(){
    this.isParent = true;
    this.parentID = 0;
    this.menuKey = "";
    this.currentMenu.menuKey = "";
    this.selectedParent = undefined;
    if(this.selectedMenuType === EnumMenyType.Parent){
      this.isParent = true;
      this.parentID = 0;
      this.menuDescription = "Parent";
      this.getGeneratedMenyKey(this.isParent, this.parentID);
    }
    if(this.selectedMenuType === EnumMenyType.Child){
      if(this.allMenus.length > 0){
        this.isParent = false;
        this.menuDescription = "Child";
      }
      else{
        this.notification.Warning("At the initial, there is no Menu. Please add a new Menu first.","Warning!");
        return;
      }
    }
  }
  onSelectedParentChange(){
    debugger;
    this.oSelectedParentMenu = this.allMenus.find(x => x.id === this.selectedParent) || new Menu();
    if(this.oSelectedParentMenu !== undefined && this.oSelectedParentMenu.id !== 0){
      this.isParent = false;
      this.parentID = this.oSelectedParentMenu.id;
      this.currentMenu.menuParentID = this.oSelectedParentMenu.id;
      this.getGeneratedMenyKey(this.isParent, this.parentID);
    }
    else{
      this.currentMenu.menuKey = "";
    }
  }
  getGeneratedMenyKey(isParent : boolean, parentID : number){
    this.loading.IsLoginStart = true;
    this.menuService.GetMenuKey(isParent, parentID).subscribe(
      (resp: any) => {
        debugger;
        this.menuKey = resp.menuKey
      },
      (err: any) => {
        this.loading.IsLoginStart = false;
        this.notification.Error(err.message);
      },
      () => {
        this.loading.IsLoginStart = false;
        if(this.menuKey !== ""){
          this.currentMenu.menuKey = this.menuKey;
        }
    });
  }
  cloaseDialogue(){
    this.cancel.emit(true);
  }
  IsValidate():boolean{
    if(this.selectedMenuType === undefined){
      this.notification.Warning("Please select menu type.","Warning!");
      return false;
    }
    if(this.isParent === false){
      if(this.selectedParent === undefined){
        this.notification.Warning("Please select a parent menu.","Warning!");
        return false;
      }
    }
    if(this.currentMenu.menuKey === undefined || this.currentMenu.menuKey === ""){
      this.notification.Warning("Need menu key.","Warning!");
      return false;
    }
    if(this.currentMenu.menuName === undefined || this.currentMenu.menuName === ""){
      this.notification.Warning("Please enter manu name.","Warning!");
      return false;
    }
    if(this.currentMenu.menuIcon === undefined || this.currentMenu.menuIcon === ""){
      this.notification.Warning("Please enter manu icon.","Warning!");
      return false;
    }
    return true;
  }
  onSave(){
    if(this.IsValidate() !== true){
      return;
    }
    const data = {
      oMenu : this.currentMenu
    }
    this.loading.IsLoginStart = true;
    this.menuService.SaveMenu(data).subscribe(
      (resp: any) => {
        
      },
      (err: any) => {
        this.loading.IsLoginStart = false;
        this.notification.Error(err.message);
      },
      () => {
        this.loading.IsLoginStart = false;
        this.notification.Success("Menu save successfully");
        this.cancel.emit(true);
    });
  }
}
