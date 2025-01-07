import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';


@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  post: Post | undefined;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router  
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.find(id).subscribe(post => {
      this.post = post;
    });
  }

  
  goBack(): void {
    this.router.navigate(['/post/index']);
  }
}
