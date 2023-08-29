import { environment } from 'src/app/environments/environment';
import { CategoryService } from './../../services/category/category.service';
import { NewsService } from './../../services/news/news.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsIn } from 'src/app/interfaces/news';
import { Alert } from 'src/app/components/alert/interfaces/alert';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {
  url = environment.urlApi;
  id: number = 0;
  news: any;
  form?: NewsIn;
  photo?: File;
  categorys: any;
  alert: Alert = { show: false, message: '', type: 'danger' };
  dialog: any = { show: false, title: 'Confirm', message: 'Are you sure?', buttons: {confirm:true, cancel: true}};
  spinner: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private categoryService: CategoryService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.spinner = true;

    this.route.paramMap.subscribe((params: any) => {
    this.id = Number(params.get('id'));
    })
    
    this.newsService.get(this.id).subscribe(async (response)=>{
      this.news = response;
      await this.news;
      this.form = {
        title: this.news.title,
        subtitle: this.news.subtitle,
        content: this.news.content,
        category: this.news.category.id,
        person: this.news.person.id,
      }
    })
  
    this.categoryService.getAll().subscribe(async (response)=>{
      this.categorys = response;
      await this.categorys;
      this.spinner = false;
    })
  }

  onCloseAlert(value: boolean): void {
    this.alert.show = !value;
  }

  onChangeForm(event: any): void {
    const { field, value } = event;

    switch (field) {
      case 'title':
        this.form!.title = value;
        break;
      case 'subtitle':
        this.form!.subtitle = value;
        break;
      case 'content':
        this.form!.content = value;
        break;
      case 'categorys':
        this.form!.category = Number(value);
        break;
      case 'file':
        this.photo = value; 
        break;
    }
  }

  async onUpdate(){
    this.spinner = true;

    if(
      this.form!.title == '' ||
      this.form!.content == '' ||
      this.form!.category == 0
      ){
        this.alert = {show: true, message: 'Fill in the fields!', type: 'danger'}
        this.spinner = false;
      }else{
        let news = await firstValueFrom(this.newsService.update(this.id, this.form!)).catch(err => err.error);
        if(news.error){
          this.alert = {show: true, message: news.content, type: 'danger'}
          this.spinner = false;
        }else{
          if(this.photo != undefined){
            news = await firstValueFrom(this.newsService.uploadFile(news.id, this.photo!)).catch(err => err.error);
          }
          if(news.error){
            this.alert = {show: true, message: news.content, type: 'danger'}
            this.spinner = false;
          }else{
            this.alert = {show: true, message: 'Successfully updated!', type: 'sucess'}
            this.spinner = false;
          }
        }
      }
  }

  async onDelete(){
    this.spinner = true;
    const message = await firstValueFrom(this.newsService.delete(this.id)).catch(err => err.error);
    if(message.error){
      this.alert = {show: true, message: message.content, type: 'danger'}
    }else{
      this.alert = {show: true, message: 'Delete successful', type: 'sucess'}
      this.spinner = false;
    }
  }

  onOpenDialog(){
    this.dialog.show = true;
  }

  async onConfirm(){
    await this.onDelete();  
    this.dialog.show = false;  
    this.router.navigate(['/home']);
  }

  onCancel(): void{
    this.dialog.show = false;
  }

}
