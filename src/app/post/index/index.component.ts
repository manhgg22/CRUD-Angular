import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PostService } from '../post.service';
import { Post } from '../post';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule, NzTableModule, NzIconModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  posts: any[] = [];
  total = 0;
  loading = true;
  pageSize = 5;
  pageIndex = 1;

  constructor(private postService: PostService, private http: HttpClient) { }

  ngOnInit(): void {
    // let checkItem = localStorage.getItem('arr')
    let temp = new BehaviorSubject(JSON.parse(localStorage.getItem('arr') ?? ''));
    console.log(temp.value?.length);

    if (temp.value?.length > 0) {

      this.posts = [...temp.value].slice(0, this.pageSize);
      this.total = 10;
      this.pageSize = this.pageSize;
      this.pageIndex = 1;
      console.log(this.total, this.pageSize, this.pageIndex);

    } else {
      this.loadDataFromServer(this.pageIndex, this.pageSize);

    }
  }

  onPageIndexChange($event: any) {
    this.pageIndex = $event;
    let temp = new BehaviorSubject(JSON.parse(localStorage.getItem('arr') ?? ''));
    console.log(temp.value?.length);
    let value = temp.value.slice(($event - 1) * this.pageSize, this.pageSize * this.pageIndex )
    this.posts = [...value]
    console.log(value);
    
  }

  pageSizeChanged($event: any) {
    this.pageIndex = 1;
    this.pageSize = $event;
  }

  onCurrentPageDataChange($event: readonly any[]): void {
    // this.listOfCurrentPageData = $event;
    // this.refreshCheckedStatus();
  }
  

  loadDataFromServer(pageIndex: number, pageSize: number): void {
    this.loading = true;
    this.getPosts(pageIndex, pageSize).subscribe(data => {
      let item = data.slice(0, 6)
      //lưu dữ liệu
      localStorage.setItem("arr", JSON.stringify(item));
      console.log(data);
      console.log(data)
      this.loading = false;
      this.total = item.length;
      this.posts = item;
    });
  }


  getPosts(pageIndex: number, pageSize: number): Observable<Post[]> {

    return this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?_page=${pageIndex}&_limit=${pageSize}`)
      .pipe(catchError(() => of([])));
  }


  onQueryParamsChange(params: NzTableQueryParams): void {
    // const { pageSize, pageIndex } = params; // 
    // this.pageSize = pageSize;
    // this.pageIndex = pageIndex;
    // this.loadDataFromServer(pageIndex, pageSize);
  }

  
  deletePost(id: number): void {
    this.postService.delete(id).subscribe(() => {
      this.posts = this.posts.filter(item => item.id !== id);
      alert('Post deleted successfully');
    });
  }
}
