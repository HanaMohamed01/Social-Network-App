import { Component, inject } from '@angular/core';
import { PostsService } from '../../core/auth/services/posts.service';
import { SideLeftComponent } from './components/side-left/side-left.component';
import { SideRightComponent } from './components/side-right/side-right.component';
import { ContentComponent } from './components/content/content.component';

@Component({
  selector: 'app-feed',
  imports: [SideLeftComponent, SideRightComponent, ContentComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
  private readonly postsService = inject(PostsService);
}
