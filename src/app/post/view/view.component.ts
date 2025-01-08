import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { EditComponent } from '../edit/edit.component';
import { NgModule } from '@angular/core';







import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-view',
  imports: [EditComponent,CommonModule],
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
}