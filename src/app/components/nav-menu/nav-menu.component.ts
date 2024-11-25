import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="sidenav.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Tech Blog</span>
      <span class="spacer"></span>
      <ng-container *ngIf="isAdmin$ | async; else loginBtn">
        <button mat-button routerLink="/admin">Admin</button>
        <button mat-button (click)="logout()">Logout</button>
      </ng-container>
      <ng-template #loginBtn>
        <button mat-button routerLink="/login">Login</button>
      </ng-template>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="side" opened>
        <mat-nav-list>
          <a mat-list-item routerLink="/" [routerLinkActiveOptions]="{exact: true}" routerLinkActive="active">
            Home
          </a>
          <mat-list-item>
            <span matListItemTitle>Frontend</span>
          </mat-list-item>
          <a mat-list-item routerLink="/category/frontend/angular" routerLinkActive="active">Angular</a>
          <a mat-list-item routerLink="/category/frontend/react" routerLinkActive="active">React</a>
          <mat-list-item>
            <span matListItemTitle>Backend</span>
          </mat-list-item>
          <a mat-list-item routerLink="/category/backend/nodejs" routerLinkActive="active">Node.js</a>
          <a mat-list-item routerLink="/category/backend/python" routerLinkActive="active">Python</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .spacer {
      flex: 1 1 auto;
    }
    mat-sidenav-container {
      flex: 1;
    }
    mat-sidenav {
      width: 250px;
    }
    .active {
      background: rgba(0,0,0,.1);
    }
  `]
})
export class NavMenuComponent {
  isAdmin$ = this.authService.isAdmin$;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}