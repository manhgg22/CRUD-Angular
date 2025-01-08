import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzAlertModule, NzButtonModule, NzInputModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  form!: FormGroup;

  constructor(public postService: PostService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      const storedPosts = JSON.parse(localStorage.getItem('arr') || '[]');

      const newId = storedPosts.length > 0
        ? Math.max(...storedPosts.map((post: any) => post.id)) + 1
        : 1;


      const newPost = {
        userId: 2,
        id: newId,
        ...this.form.value
      };

      const updatedPosts = [...storedPosts, newPost];
      localStorage.setItem('arr', JSON.stringify(updatedPosts));

      
      this.postService.create(newPost).subscribe(() => {
        alert('Post created successfully');
        this.router.navigateByUrl('post/index');
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/post/index']);
  }
}
