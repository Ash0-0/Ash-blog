import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsSubject = new BehaviorSubject<Post[]>([]);

  getPosts(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }

  getPost(id: string): Observable<Post | undefined> {
    return this.postsSubject.pipe(
      map(posts => posts.find(p => p.id === id))
    );
  }

  getPostsByCategory(category: string, subcategory?: string): Observable<Post[]> {
    return this.postsSubject.pipe(
      map(posts => posts.filter(p => 
        p.category === category && 
        (!subcategory || p.subcategory === subcategory)
      ))
    );
  }

  addPost(post: Post) {
    this.posts.push(post);
    this.postsSubject.next([...this.posts]);
  }

  updatePost(post: Post) {
    const index = this.posts.findIndex(p => p.id === post.id);
    if (index !== -1) {
      this.posts[index] = post;
      this.postsSubject.next([...this.posts]);
    }
  }

  deletePost(id: string) {
    this.posts = this.posts.filter(p => p.id !== id);
    this.postsSubject.next([...this.posts]);
  }
}