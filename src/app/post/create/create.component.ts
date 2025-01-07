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
  imports: [CommonModule, ReactiveFormsModule,NzAlertModule,NzButtonModule,NzInputModule],
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
      let body = {
        userId: 2,
        id: 11,
        ...this.form.value
      }
      const temp = new BehaviorSubject(JSON.parse(localStorage.getItem('arr') ?? ''));
      let newArr = [...temp.value].concat([body]);
      
      localStorage.setItem('arr', JSON.stringify(newArr));


      // localStorage.setItem('arr', )
      this.postService.create(this.form.value).subscribe((res: any) => {
        // let body 
        alert("Post created successfully");
        this.router.navigateByUrl('post/index');
      });
    }
  }
  goBack(): void {
    this.router.navigate(['/post/index']);
  }
}
