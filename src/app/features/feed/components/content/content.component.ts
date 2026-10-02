import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../../core/auth/services/posts.service';
import { Post } from '../../../../core/models/post.interface';

@Component({
  selector: 'app-content',
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent implements OnInit {
  private readonly postsService = inject(PostsService);

  postsData: Post[] = [];

  currentUser = JSON.parse(localStorage.getItem('userData') || 'null');

  ngOnInit(): void {
    this.getAllPostsData();
  }

  getAllPostsData(): void {
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        this.postsData = res.data.posts;
        console.log(res.data.posts);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
