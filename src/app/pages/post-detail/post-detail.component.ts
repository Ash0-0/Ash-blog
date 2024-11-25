import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MarkdownViewerComponent } from '../../components/markdown-viewer/markdown-viewer.component';
import { PostService } from '../../services/post.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MarkdownViewerComponent
  ],
  template: `
    <mat-card *ngIf="post$ | async as post">
      <mat-card-header>
        <mat-card-title>{{post.title}}</mat-card-title>
        <mat-card-subtitle>
          {{post.category}} / {{post.subcategory}}
        </mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        <app-markdown-viewer [content]="post.content"></app-markdown-viewer>
      </mat-card-content>

      <mat-card-footer>
        <mat-chip-set>
          <mat-chip *ngFor="let tag of post.tags">{{tag}}</mat-chip>
        </mat-chip-set>
      </mat-card-footer>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 20px 0;
    }
    mat-card-content {
      margin-top: 20px;
    }
    mat-card-footer {
      padding: 16px;
    }
  `]
})
export class PostDetailComponent {
  post$ = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id') || '';
      return this.postService.getPost(id);
    })
  );

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}
}