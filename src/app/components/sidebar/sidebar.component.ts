import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Home', icon: 'dashboard', class: '' },
  { path: '/student-dashboard', title: 'Students', icon: 'person', class: '' },
  { path: '/course-dashboard', title: 'Courses', icon: 'content_paste', class: '' },
  { path: '/scheduler-dashboard', title: 'Time Table', icon: 'library_books', class: '' },
  { path: '/register-dashboard', title: 'Register', icon: 'bubble_chart', class: '' },
  { path: '/products-dashboard', title: 'Products', icon: 'shopping_cart', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
