import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule
  ],
  template: `
    <form #postForm="ngForm" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Title</mat-label>
        <input matInput [(ngModel)]="post.title" name="title" required>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Category</mat-label>
        <input matInput [(ngModel)]="post.category" name="category" required>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Subcategory</mat-label>
        <input matInput [(ngModel)]="post.subcategory" name="subcategory">
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Content (Markdown)</mat-label>
        <textarea matInput [(ngModel)]="post.content" name="content" rows="10" required></textarea>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Tags (comma separated)</mat-label>
        <input matInput [(ngModel)]="tagsString" name="tags">
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit">Save</button>
    </form>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
  `]
})
export class PostEditorComponent {
  @Input() post: Post = {
    id: '',
    title: '',
    content: '',
    category: '',
    subcategory: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: []
  };

  @Output() save = new EventEmitter<Post>();

  get tagsString(): string {
    return this.post.tags.join(', ');
  }

  set tagsString(value: string) {
    this.post.tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
  }

  onSubmit() {
    this.save.emit(this.post);
  }
}