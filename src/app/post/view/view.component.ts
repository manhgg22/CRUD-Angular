import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, NzInputModule, NzButtonModule, NzAlertModule, EditComponent],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  post: Post | undefined;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router 
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const posts = JSON.parse(localStorage.getItem('arr') || '[]') as Post[];
    this.post = posts.find(p => p.id === id);
  }

  goBack(): void {
    this.router.navigate(['/post/index']);
  }

  onUpdate(updatedPost: Post): void {
    this.post = updatedPost;
    this.editMode = false;
  }
}