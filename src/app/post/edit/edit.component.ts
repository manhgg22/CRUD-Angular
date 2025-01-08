import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../post.service';
import { Post } from '../post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnChanges {
  @Input() post!: Post;
  @Output() update = new EventEmitter<Post>();
  form!: FormGroup;

  constructor(
    public postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && changes['post'].currentValue) {
      this.initializeForm();
    }
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
      this.postService.update(this.post.id, updatedPost).subscribe((res: any) => {
        alert('Data Updated Successfully');
        this.update.emit(updatedPost);
        this.router.navigate(['/post/index']);
      });
    }
  }
}