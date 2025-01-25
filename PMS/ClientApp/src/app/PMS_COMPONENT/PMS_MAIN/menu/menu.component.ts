import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Router } from '@angular/router';
import { AUTHGUARD } from '../../../PMS_AUTHGUARD/AuthGuard';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
  items: any[] = [];
  filteredItems: any[] = [];
  childItems: any[] = [];
  searchQuery: string = '';

  constructor(private router: Router,private auth : AUTHGUARD) {}
  ngOnInit() {
    this.items = this.auth.getCurrentUserMenu();
    this.filteredItems = [...this.items];
    this.auth.loginEvent.subscribe(value => this.GetCurrentUserALLMenu(value));
  }
  private GetCurrentUserALLMenu(value : boolean):void{
    this.items = [];
    this.filteredItems = [];
    const currentUserToken = localStorage.getItem('pms_token');
    if(currentUserToken != null){
      var allMenus = this.auth.getCurrentUserMenu();
      this.items = allMenus;
      this.filteredItems = [...this.items];
    }
  }
  filterItems() {
    if (!this.searchQuery) {
      this.filteredItems = [...this.items];
    } else {
    this.filteredItems = this.items
      .map(item => this.filterMenuItem(item, this.searchQuery.toLowerCase()))
      .filter(item => item); // Filter out null values
    }
  }
  filterMenuItem(item: any, query: string): any | null {
    const hasMatchingLabel = item.label.toLowerCase().startsWith(query);
    this.childItems = [];
    if (item.items) {
      this.childItems = item.items;
      const filteredChildren = this.childItems
        .map(child => this.filterMenuItem(child, query))
        .filter(child => child);
      if (hasMatchingLabel) {
        return { ...item, expanded: true, items: item.items };
      }
      if (filteredChildren.length > 0) {
        return { ...item, expanded: true, items: filteredChildren };
      }
    }
    return hasMatchingLabel ? { ...item, expanded: false } : null;
  }
}
