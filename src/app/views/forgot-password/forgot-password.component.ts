import { Router } from '@angular/router';
import { ResetPassword, ResetPasswordIn } from './../../interfaces/forgot-password';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Alert } from 'src/app/components/alert/interfaces/alert';
import { ResendCodeIn, SendCode, SendCodeIn } from 'src/app/interfaces/forgot-password';
import { ErrorMessage } from 'src/app/interfaces/message';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  alert: Alert = { show: false, message: '', type: 'danger' }
  spinner: boolean = false;
  step: number = 1;
  form: SendCodeIn = {
    email: '',
  }

  codeSented?: SendCode;
  code: Array<string> = Array(5);

  formNewPassword: any = {
    newPassword: '',
    newPasswordAgain: '',
  }

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  onCloseAlert(value: boolean): void {
    this.alert.show = !value;
  }

  onChangeForm(event: any): void {
    const { field, value } = event;
    switch (field) {
      case 'email':
        this.form.email = value;
        break;
      case 'code-0':
        this.code[0] = value;
        break;
      case 'code-1':
        this.code[1] = value;
        break;
      case 'code-2':
        this.code[2] = value;
        break;
      case 'code-3':
        this.code[3] = value;
        break;
      case 'code-4':
        this.code[4] = value;
        break;
      case 'new-password':
        this.formNewPassword.newPassword = value;
        break;
      case 'new-password-again':
        this.formNewPassword.newPasswordAgain = value;
        break;
    }
  }

  async onSendCode() {
    this.spinner = true;

    if (this.form.email == '') {
      this.alert = { show: true, message: 'Fill in all fields', type: 'danger' };
      this.spinner = false;
    } else {
      const codeSented = await firstValueFrom(this.userService.sendCode(this.form)).catch(err => err.error);
      if (!codeSented.code) {
        this.alert = { show: true, message: codeSented.content, type: 'danger' };
        this.spinner = false;
      } else {
        this.alert = { show: true, message: 'Code sent successfully', type: 'sucess' };
        this.spinner = false;
        this.codeSented = codeSented;
        this.step = 2;
      }
    }
  }

  async onReendCode() {
    this.spinner = true;
    const resendCode: ResendCodeIn = {
      email: this.codeSented?.email!,
      code: this.codeSented?.code!
    }
    const codeResent = await firstValueFrom(this.userService.resendCode(resendCode)).catch(err => err.error);
    if (!codeResent.code) {
      this.alert = { show: true, message: codeResent.content, type: 'danger' };
      this.spinner = false;
    } else {
      this.alert = { show: true, message: 'Code resent successfully', type: 'sucess' };
      this.spinner = false;
      this.codeSented = codeResent;
      this.step = 2;
    }
  }

  onCheckCode(): void {
    this.spinner = true;
    if(
      this.code[0] == undefined ||
      this.code[1] == undefined ||
      this.code[2] == undefined ||
      this.code[3] == undefined ||
      this.code[4] == undefined
      ){
        this.alert = { show: true, message: 'Fill in the code', type: 'danger' };
        this.spinner = false;
      }else{
        const code = `C-${this.code[0]}${this.code[1]}${this.code[2]}${this.code[3]}${this.code[4]}`;
        if(code != this.codeSented?.code){
          this.alert = { show: true, message: 'Incorrect code', type: 'danger' };
          this.spinner = false;
        }else{
          this.alert = { show: true, message: 'Successfully verified code', type: 'sucess' };
          this.spinner = false;
          this.step = 3
        }
      }
  }

  async onResetPassword(){
    this.spinner = true;
    if(
      this.formNewPassword.newPassword == '' ||
      this.formNewPassword.newPasswordAgain == ''
    ){
      this.alert = { show: true, message: 'Fill in all fields', type: 'danger' };
      this.spinner = false;
    }else if(
      this.formNewPassword.newPassword != this.formNewPassword.newPasswordAgain
    ){
      this.alert = { show: true, message: 'Different passwords', type: 'danger' };
      this.spinner = false;
    }else{
      const formResetPassword: ResetPasswordIn = {
        password: this.formNewPassword.newPassword,
        person: this.codeSented?.person!
      }
      const resetPassword: ResetPassword | ErrorMessage = await firstValueFrom(this.userService.passwordRecovery(formResetPassword)).catch(err => err.error);
      if(resetPassword.status != 200){
        this.alert = { show: true, message: resetPassword.content, type: 'danger' };
        this.spinner = false;
      }else{
        this.alert = { show: true, message: resetPassword.content, type: 'sucess' };
        this.spinner = false;
        this.router.navigate(['/login']);
      }
    }
  }
}
