import { NewsService } from './../../services/news/news.service';
import { UserService } from 'src/app/services/user/user.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { Component } from '@angular/core';
import { NewsIn } from 'src/app/interfaces/news';
import { Alert } from 'src/app/components/alert/interfaces/alert';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register-news',
  templateUrl: './register-news.component.html',
  styleUrls: ['./register-news.component.css']
})
export class RegisterNewsComponent {
  alert: Alert = { show: false, message: '', type: 'danger' }
  spinner: boolean = false;

  form: NewsIn = {
    title: '',
    subtitle: '',
    content: '',
    category: 0,
    person: 0
  }

  photo?: File;

  categorys?: any;

  constructor(
    private newsService: NewsService,
    private categoryService: CategoryService,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.spinner = true;
    this.categoryService.getAll().subscribe(async (response) => {
      this.categorys = response;
      await this.categorys;
      this.spinner = false;
    });
  }

  onCloseAlert(value: boolean): void {
    this.alert.show = !value;
  }

  onChangeForm(event: any): void {
    const { field, value } = event;

    switch (field) {
      case 'title':
        this.form.title = value;
        break;
      case 'subtitle':
        this.form.subtitle = value;
        break;
      case 'content':
        this.form.content = value;
        break;
      case 'categorys':
        this.form.category = Number(value);
        break;
      case 'file':
        this.photo = value; 
        break;
    }
  }

  async onRegister() {
    this.spinner = true;

    if(
      this.form.title == '' ||
      this.form.content == '' ||
      this.form.category == 0
      ){
        this.alert = {show: true, message: 'Fill in the fields!', type: 'danger'}
        this.spinner = false;
      }else{
        const user = this.userService.getAuth();
        this.form.person = user.person;
        let news = await firstValueFrom(this.newsService.create(this.form)).catch(err => err.error);
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
            this.alert = {show: true, message: 'Successfully registered!', type: 'sucess'}
            this.spinner = false;
          }
        }
      }
  }
}
