import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatChipsModule],
  template: `
    <mat-card class="content-card">
      <mat-card-header>
        <mat-card-title>{{title}}</mat-card-title>
        <mat-card-subtitle>{{category}} / {{subcategory}} / {{topic}}</mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        <div [ngSwitch]="true">
          <!-- Angular Getting Started -->
          <div *ngSwitchCase="isRoute('frontend', 'angular', 'getting-started')">
            <section class="content-section">
              <h2>Introduction to Angular</h2>
              <p>Angular is a platform and framework for building single-page client applications using HTML and TypeScript.</p>
              
              <div class="code-block">
                <pre><code>ng new my-app
cd my-app
ng serve</code></pre>
              </div>
            </section>

            <mat-divider></mat-divider>

            <section class="content-section">
              <h2>Project Structure</h2>
              <img src="https://angular.io/generated/images/guide/architecture/overview2.png" 
                   alt="Angular Architecture" 
                   class="content-image">
            </section>
          </div>

          <!-- Express -->
          <div *ngSwitchCase="isRoute('backend', 'nodejs', 'express')">
            <section class="content-section">
              <h2>Express.js Basics</h2>
              <p>Express is a minimal and flexible Node.js web application framework.</p>
              
              <div class="code-block">
                <pre>
                <code>
  const express = require('express');
  const app = express();


</code>
              </pre>
              </div>
            </section>
          </div>

          <div *ngSwitchDefault>
            <p>Content for {{category}}/{{subcategory}}/{{topic}} will be available soon.</p>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
    .content-card {
      margin-bottom: 20px;
    }
    .content-section {
      margin: 24px 0;
    }
    .content-image {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      margin: 16px 0;
    }
    .code-block {
      background: #f5f5f5;
      padding: 16px;
      border-radius: 4px;
      margin: 16px 0;
      overflow-x: auto;
    }
    pre {
      margin: 0;
    }
    code {
      font-family: 'Courier New', Courier, monospace;
    }
    mat-divider {
      margin: 32px 0;
    }
  `,
  ],
})
export class CategoryComponent implements OnInit {
  category = '';
  subcategory = '';
  topic = '';
  title = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.subcategory = params['subcategory'];
      this.topic = params['topic'];
      this.updateTitle();
    });
  }

  private updateTitle() {
    if (this.isRoute('frontend', 'angular', 'getting-started')) {
      this.title = 'Getting Started with Angular';
    } else if (this.isRoute('backend', 'nodejs', 'express')) {
      this.title = 'Building APIs with Express.js';
    } else {
      this.title = `${this.subcategory} - ${this.topic}`;
    }
  }

  isRoute(category: string, subcategory: string, topic: string): boolean {
    return (
      this.category === category &&
      this.subcategory === subcategory &&
      this.topic === topic
    );
  }
}
