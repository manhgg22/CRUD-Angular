import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';


@Component({
  selector: 'app-view',
  imports: [CommonModule, NzInputModule,NzButtonModule,NzAlertModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  post: Post | undefined;
  editMode: boolean = false;

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

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  onUpdate(updatedPost: Post): void {
    this.post = updatedPost;
    this.editMode = false;
  }
  goBack(): void {
    this.router.navigate(['/post/index']);
  }
}