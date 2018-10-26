import { Component, OnInit, Input } from '@angular/core';
import { Routes, Router } from '@angular/router';

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
  selector: 'militar-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.less']
})
export class SubMenuComponent implements OnInit {
  @Input() menu: MenuItem[];
  @Input() rootPath: string;
  isCollapsed = false;
  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }
  toUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}
