import { NewsService } from './../../services/news/news.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  news: any;
  spinner: boolean = false;
  search: string = '';

  constructor(
    private newsService: NewsService
  ){}

  ngOnInit(): void{
    this.spinner = true;
    this.newsService.getAll().subscribe(async (response)=>{
      this.news = response;
      await this.news;
      this.spinner = false;
    })
  }

  async onSearch(event: any){
    this.spinner = true;
    const value = event;

    this.newsService.search(value).subscribe(async (response)=>{
      this.news = response;
      await this.news;
      this.spinner = false;
    })
  }

}
