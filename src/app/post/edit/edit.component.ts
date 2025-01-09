import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../post.service';
import { Post } from '../post';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAlertComponent } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NzAlertComponent, NzButtonModule, NzFormModule, NzInputModule, NzGridModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() post!: Post;
  @Output() update = new EventEmitter<Post>();
  form!: FormGroup;

  constructor(
    public postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.post) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      const posts = JSON.parse(localStorage.getItem('arr') || '[]') as Post[];
      this.post = posts.find(p => p.id === id) || {} as Post;
    }
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl(this.post?.title, [Validators.required]),
      body: new FormControl(this.post?.body, Validators.required)
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      const updatedPost: Post = {
        ...this.post,
        ...this.form.value
      };
      const posts = JSON.parse(localStorage.getItem('arr') || '[]') as Post[];
      const index = posts.findIndex(p => p.id === updatedPost.id);
      if (index !== -1) {
        posts[index] = updatedPost;
        localStorage.setItem('arr', JSON.stringify(posts));
      }
      alert('Data Updated Successfully');
      this.update.emit(updatedPost);
    }
  }

  goBack(): void {
    this.router.navigate(['/post/index']);
  }
}