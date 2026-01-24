import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MenuItem } from '../../../interfaces/ui.interface';
import { CommonModule } from '@angular/common';
import { v4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
  imports: [MatMenuTrigger, MatIcon, MatMenu, MatMenuItem, MatButton, CommonModule]
})
export class HeaderMenuComponent implements OnInit {
  @Input() menuItems: MenuItem[] = [];
  @Output() menuItemSelected: EventEmitter<MenuItem> = new EventEmitter();

  ngOnInit() {
    if (!this.menuItems?.length) return;

    this.menuItems.forEach(i => i.id = v4());
  }

  protected menuItemClicked(menuItem: MenuItem) {
    if (!menuItem) return;
    menuItem.action ? menuItem.action() : this.menuItemSelected.emit(menuItem);
  }
}
