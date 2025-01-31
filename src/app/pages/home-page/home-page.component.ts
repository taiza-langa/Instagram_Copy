import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../types/post';
import { FeedComponent } from '../../components/feed/feed.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [FeedComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{
  posts: Post[] = [];
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
      this.fetchData();
  }

  fetchData() {
    forkJoin([
      this.httpClient.get<{ posts: Post[] }>('http://localhost:3000/explore_usa'),
      this.httpClient.get<{ posts: Post[] }>('http://localhost:3000/explore_br'),
      this.httpClient.get<{ posts: Post[] }>('http://localhost:3000/friends')
    ]).subscribe((responses: [{ posts: Post[] }, { posts: Post[] }, { posts: Post[] }]) => {
      this.posts = [
        ...responses[0].posts,
        ...responses[1].posts,
        ...responses[2].posts
      ];
    });
  }
}