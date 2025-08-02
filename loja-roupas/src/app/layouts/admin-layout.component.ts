import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <div class="layout-wrapper">
      <app-sidebar #sidebar (collapsedChange)="onSidebarCollapsed($event)"></app-sidebar>
      <div class="layout-main" [class.collapsed]="sidebarCollapsed">
        <app-header [sidebarCollapsed]="sidebarCollapsed" (sidebarToggle)="toggleSidebar()"></app-header>
        <main class="layout-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout-wrapper {
      display: flex;
      height: 100vh;
      background-color: #f8f9fa;
    }

    .layout-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      margin-left: 250px;
      transition: margin-left 0.3s cubic-bezier(0.4,0,0.2,1);
    }
    
    .layout-main.collapsed {
      margin-left: 60px;
    }

    .layout-content {
      flex: 1;
      padding: 1.5rem;
      overflow-y: auto;
      background-color: #f8f9fa;
    }
  `]
})
export class AdminLayoutComponent {
  @ViewChild('sidebar') sidebar!: SidebarComponent;
  sidebarCollapsed = false;

  onSidebarCollapsed(collapsed: boolean) {
    this.sidebarCollapsed = collapsed;
  }

  toggleSidebar() {
    if (this.sidebar) {
      this.sidebar.toggleSidebar();
    }
  }
} 