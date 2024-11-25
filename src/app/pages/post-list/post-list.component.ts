import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { marked } from 'marked';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, RouterModule],
  template: `
    <div class="posts-grid">
      <mat-card *ngFor="let post of posts$ | async">
        <mat-card-header>
          <mat-card-title>{{post.title}}</mat-card-title>
          <mat-card-subtitle>{{post.category}} / {{post.subcategory}}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="markdown-preview" [innerHTML]="getPreview(post.content)"></div>
        </mat-card-content>
        <mat-card-actions>
          <mat-chip-set>
            <mat-chip *ngFor="let tag of post.tags">{{tag}}</mat-chip>
          </mat-chip-set>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .posts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .markdown-preview {
      max-height: 200px;
      overflow: hidden;
      position: relative;
    }
    .markdown-preview::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50px;
      background: linear-gradient(transparent, white);
    }
  `]
})
export class PostListComponent {
  posts$ = this.postService.getPosts();

  constructor(private postService: PostService) {}

  getPreview(content: string): string {
    return marked(content.slice(0, 200) + '...');
  }
}