import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="grid">
      <mat-card>
        <mat-card-header>
          <mat-icon mat-card-avatar>web</mat-icon>
          <mat-card-title>Frontend Development</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Learn modern frontend frameworks and libraries.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button color="primary" routerLink="/frontend/angular/getting-started">
            Get Started with Angular
          </button>
        </mat-card-actions>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-icon mat-card-avatar>code</mat-icon>
          <mat-card-title>Backend Development</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Master server-side programming and APIs.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button color="primary" routerLink="/backend/nodejs/express">
            Learn Express.js
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
    mat-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    mat-card-content {
      flex-grow: 1;
    }
  `]
})
export class HomeComponent {}