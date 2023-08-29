import { PersonService } from './../../services/person/person.service';
import { Alert } from 'src/app/components/alert/interfaces/alert';
import { Person } from './../../interfaces/person';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-register-in',
  templateUrl: './register-in.component.html',
  styleUrls: ['./register-in.component.css']
})
export class RegisterInComponent {
  public auth = environment;
  alert: Alert = {show: false, message: '', type: 'danger'}
  spinner: boolean = false;

  form: Person = {
    name: '',
    date_born: '',
    sex: '',
    email: '',
    password: '',
    password_again: '',
  };

  photo?: File;


  constructor(
    private personService: PersonService,
    private userService: UserService,
    private router: Router,
  ){}

  onCloseAlert(value: boolean): void{
    this.alert.show = !value;
  }

  onChangeForm(event: any): void {
    const { field, value } = event;
    switch (field) {
      case 'name':
        this.form.name = value;
        break;
      case 'date-born':
        this.form.date_born = value;
        break;
      case 'sex':
        this.form.sex = value;
        break;
      case 'email':
        this.form.email = value;
        break;
      case 'password':
        this.form.password = value;
        break;
      case 'password-again':
        this.form.password_again = value;
        break;
      case 'file':
        this.photo = value;
        break;
    }
  }

  async onRegister(){
    this.spinner = true;
    
    if(
      this.form.name == '' ||
      this.form.date_born == '' ||
      this.form.sex == '' ||
      this.form.email == '' ||
      this.form.password == '' ||
      this.form.password_again == ''
      ){
        this.alert = {show:true, message: 'Fill in all fields!', type: 'danger'};
        this.spinner = false;
      }else if(this.form.password != this.form.password_again){
        this.alert = {show:true, message: 'Different passwords!', type: 'danger'};
        this.spinner = false;
      }
      else{
        const [day, month, year] = this.form.date_born.split('/');
        const dateFormated = `${year}-${month}-${day}`;
        this.form.date_born = dateFormated;
        const person = await firstValueFrom(this.personService.create(this.form)).catch(err => err.error);
        if(!person.token){
          this.alert = {show:true, message: person.content, type: 'danger'};
          this.spinner = false;
        }else{
          if(this.photo != undefined){
            this.form = await firstValueFrom(this.personService.uploadFile(person.id, this.photo!)).catch(err => err.error);
          }
          this.userService.setAuth({token: person.token, person: person.id});
          this.auth.setAuthenticated(true);
          this.alert = {show:true, message: 'Registered successfully', type: 'sucess'};
          this.spinner = false;
          this.router.navigate(['/home']);
        }
      }
  }
}
