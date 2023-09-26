import { Alert } from './../../components/alert/interfaces/alert';
import { Component } from '@angular/core';
import { Login, LoginIn } from '../../interfaces/user';
import { ErrorMessage } from 'src/app/interfaces/message';
import { UserService } from 'src/app/services/user/user.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-login-in',
  templateUrl: './login-in.component.html',
  styleUrls: ['./login-in.component.css']
})
export class LoginInComponent {
  public auth = environment;
  alert: Alert = {show: false, message: '', type: 'danger'}
  spinner: boolean = false;

  form: LoginIn = {
    email: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private router: Router){
  }

  onCloseAlert(value: boolean): void{
    this.alert.show = !value;
  }

  onChangeForm(event: any):void{
    const { field, value } = event;
    switch(field){
      case 'email':
        this.form.email = value;
        break;
      case 'password':
          this.form.password = value;
          break;
    }
  }

  async onLogin(){
    this.spinner = true;

    if(
      this.form.email == '' ||
      this.form.password == ''
      ){
        this.alert = {show:true, message: 'Fill in all fields!', type: 'danger'};
        this.spinner = false;
      }else{
        const user: Login | ErrorMessage | any = await firstValueFrom(this.userService.login(this.form)).catch(err => err.error);
        if(!user.token){
          this.alert = {show:true, message: user.content, type: 'danger'};
          this.spinner = false;
        }else{
          this.userService.setAuth(user);
          this.auth.setAuthenticated(true);
          this.auth.setUser(await this.userService.getUser());
          this.alert = {show:true, message: user.content, type: 'sucess'};
          this.spinner = false;
          this.router.navigate(['/home']);
        }
      }
  }



}
