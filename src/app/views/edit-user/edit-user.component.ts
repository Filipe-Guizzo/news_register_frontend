import { PersonService } from './../../services/person/person.service';
import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/components/alert/interfaces/alert';
import { environment } from 'src/app/environments/environment';
import { UserService } from 'src/app/services/user/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public auth = environment;
  alert: Alert  = {show: false, message: '', type: 'danger'}
  spinner: boolean = false;
  id?: number;
  person: any;
  form: any;
  photo?: File;

  constructor(
    private personService: PersonService,
    private userService: UserService,
  ){}

  async ngOnInit(){
    this.spinner = true;
    const auth = await this.userService.getAuth();
    this.id = auth.person;
    this.person = await firstValueFrom(this.personService.get(this.id!));
    const { name, date_born, sex, email} = this.person;
    this.form = {name: name, date_born: date_born, sex: sex, email: email, password: '', password_again: ''};
    this.spinner = false;
  }

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

  async onUpdate(){
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
        if(month != undefined){
          console.log(day);
          const dateFormated = `${year}-${month}-${day}`;
          this.form.date_born = dateFormated;
        }
        const person = await firstValueFrom(this.personService.update(this.id!, this.form)).catch(err => err.error);
        if(!person.token){
          this.alert = {show:true, message: person.content, type: 'danger'};
          this.spinner = false;
        }else{
          this.userService.setAuth({token: person.token, person: person.id});
          this.auth.setAuthenticated(true);
          if(this.photo != undefined){
            this.form = await firstValueFrom(this.personService.uploadFile(person.id, this.photo!)).catch(err => err.error);
          }
          this.alert = {show:true, message: 'Registered successfully', type: 'sucess'};
          this.spinner = false;
        }
      }
  }
}
