import { Component, OnInit, Input } from '@angular/core';
import { Routes } from '@angular/router';

export interface MenuItem {
  path: string;
  data: {
    menu: {
      title: string;
      icon?: string;
      selected?: boolean;
      expanded?: boolean;
      order?: number;
    }
  };
  children?: MenuItem[];
}

@Component({
  selector: 'militar-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  @Input() menu: MenuItem[];
  @Input() rootPath: string;
  @Input() isCollapsed: boolean;
  constructor() {
  }

  ngOnInit() {
  }
}
