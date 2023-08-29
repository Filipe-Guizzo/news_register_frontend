import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Alert } from 'src/app/components/alert/interfaces/alert';
import { Category, CategoryIn } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-register-categorys',
  templateUrl: './register-categorys.component.html',
  styleUrls: ['./register-categorys.component.css']
})
export class RegisterCategorysComponent implements OnInit {
  alert: Alert = {show: false, message: '', type: 'danger'}
  spinner: boolean = false;

  form: CategoryIn = {
    name: '',
    person: 0 
  }

  categorys?: any;
  categoryValid = true;

  constructor(
    private categoryService: CategoryService,
    private userService: UserService
  ){

  }

  ngOnInit():void{
    this.spinner = true;
    this.categoryService.getAll().subscribe( async (response) => {
      this.categorys = response;
      await this.categorys;
      this.spinner = false;
    });
  }

  onCloseAlert(value: boolean): void{
    this.alert.show = !value;
  }

  onChangeForm(event: any):void{
    const { field, value } = event;
    switch(field){
      case 'category':
        this.form.name = value;
        break;
    }
  }

  async onRegister(){
    this.spinner = true;
    this.categorys.forEach((element:Category) => { element.name == this.form.name? this.categoryValid = false: this.categoryValid = true});

    if(this.form.name == ''){
      this.alert = {show:true, message: 'Fill in all fields!', type: 'danger'};
      this.spinner = false;
    }else if(this.categoryValid == false){
      this.alert = {show:true, message: 'Category already registered', type: 'danger'};
      this.spinner = false;
    }else{
      const user = this.userService.getAuth();
      this.form.person = user.person;
      const category = await firstValueFrom(this.categoryService.create(this.form)).catch(err=>err.error);
      if(category?.content){
        this.alert = {show:true, message: category.content, type: 'danger'};
        this.spinner = false;
      }else{
        this.alert = {show:true, message: 'Category successfully registered', type: 'sucess'};
        this.categoryService.getAll().subscribe( async (response) => {
          this.categorys = response;
          await this.categorys;
          this.spinner = false;
        });
      }
    }
  }
}
