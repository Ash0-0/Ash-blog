import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule
  ],
  template: `
    <mat-toolbar color="primary" class="toolbar">
      <button mat-icon-button (click)="sidenav.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Tech Blog</span>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav #sidenav [mode]="isMobile ? 'over' : 'side'" [opened]="!isMobile">
        <mat-nav-list>
          <a mat-list-item routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            <mat-icon matListItemIcon>home</mat-icon>
            Home
          </a>

          <mat-expansion-panel class="mat-elevation-z0">
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon>web</mat-icon>
                Frontend
              </mat-panel-title>
            </mat-expansion-panel-header>
            
            <mat-nav-list>
              <a mat-list-item routerLink="/frontend/angular/getting-started">
                Angular - Getting Started
              </a>
              <a mat-list-item routerLink="/frontend/angular/components">
                Angular - Components
              </a>
              <a mat-list-item routerLink="/frontend/react/hooks">
                React - Hooks
              </a>
            </mat-nav-list>
          </mat-expansion-panel>

          <mat-expansion-panel class="mat-elevation-z0">
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon>code</mat-icon>
                Backend
              </mat-panel-title>
            </mat-expansion-panel-header>
            
            <mat-nav-list>
              <a mat-list-item routerLink="/backend/nodejs/express">
                Node.js - Express
              </a>
              <a mat-list-item routerLink="/backend/python/django">
                Python - Django
              </a>
            </mat-nav-list>
          </mat-expansion-panel>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
    }
    mat-sidenav-container {
      flex: 1;
      margin-top: 64px;
    }
    mat-sidenav {
      width: 280px;
    }
    .content {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .active {
      background: rgba(0,0,0,.1);
    }
    mat-expansion-panel {
      border-radius: 0 !important;
    }
    mat-expansion-panel-header {
      padding: 0 16px;
    }
    mat-panel-title {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    @media (max-width: 600px) {
      .toolbar {
        margin-top: 0;
      }
      mat-sidenav-container {
        margin-top: 56px;
      }
    }
  `]
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMobile = window.innerWidth < 768;

  constructor() {
    window.onresize = () => {
      this.isMobile = window.innerWidth < 768;
    };
  }
}