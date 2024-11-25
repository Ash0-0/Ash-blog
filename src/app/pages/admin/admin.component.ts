import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PostEditorComponent } from '../../components/post-editor/post-editor.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, PostEditorComponent],
  template: `
    <h2>Manage Posts</h2>
    
    <button mat-raised-button color="primary" (click)="isEditing = true" *ngIf="!isEditing">
      Add New Post
    </button>

    <div *ngIf="isEditing">
      <app-post-editor [post]="currentPost" (save)="savePost($event)"></app-post-editor>
    </div>

    <table mat-table [dataSource]="posts$ | async" class="mat-elevation-z8">
      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef>Title</th>
        <td mat-cell *matCellDef="let post">{{post.title}}</td>
      </ng-container>

      <ng-container matColumnDef="category">
        <th mat-header-cell *matHeaderCellDef>Category</th>
        <td mat-cell *matCellDef="let post">{{post.category}}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let post">
          <button mat-button color="primary" (click)="editPost(post)">Edit</button>
          <button mat-button color="warn" (click)="deletePost(post.id)">Delete</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="['title', 'category', 'actions']"></tr>
      <tr mat-row *matRowDef="let row; columns: ['title', 'category', 'actions'];"></tr>
    </table>
  `,
  styles: [`
    table {
      width: 100%;
      margin-top: 20px;
    }
  `]
})
export class AdminComponent {
  posts$ = this.postService.getPosts();
  isEditing = false;
  currentPost: Post = {
    id: '',
    title: '',
    content: '',
    category: '',
    subcategory: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: []
  };

  constructor(private postService: PostService) {}

  savePost(post: Post) {
    if (post.id) {
      this.postService.updatePost(post);
    } else {
      post.id = Date.now().toString();
      this.postService.addPost(post);
    }
    this.isEditing = false;
  }

  editPost(post: Post) {
    this.currentPost = { ...post };
    this.isEditing = true;
  }

  deletePost(id: string) {
    this.postService.deletePost(id);
  }
}