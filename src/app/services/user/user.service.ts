import { ResendCode, ResendCodeIn, ResetPassword, ResetPasswordIn } from './../../interfaces/forgot-password';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Login, LoginIn } from '../../interfaces/user';
import { Observable, firstValueFrom } from 'rxjs';
import { ErrorMessage } from 'src/app/interfaces/message';
import { SendCode, SendCodeIn } from 'src/app/interfaces/forgot-password';
import { Person } from 'src/app/interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = environment.urlApi;

  constructor(
    private http: HttpClient,
    ) { 
  }

  getAuthenticated(): boolean{
    const token = localStorage.getItem('token');
    const authenticated = token == null || token == undefined || token == ''? false:true;
    return authenticated;
  }

  login(userLogin: LoginIn): Observable<Login | ErrorMessage>{
    return this.http.post<Login | ErrorMessage>(this.url + '/auth/login/', userLogin);
  }

  sendCode(sendCode: SendCodeIn): Observable<SendCode | ErrorMessage>{
    return this.http.post<SendCode | ErrorMessage>(this.url + '/auth/send-code/', sendCode);
  }

  resendCode(resendCode: ResendCodeIn): Observable<ResendCode | ErrorMessage>{
    return this.http.post<ResendCode | ErrorMessage>(this.url + '/auth/resend-code/', resendCode);
  }

  passwordRecovery(resetPassword: ResetPasswordIn): Observable<ResetPassword | ErrorMessage>{
    return this.http.put<ResetPassword | ErrorMessage>(this.url + '/auth/password-recovery/', resetPassword);
  }

  setAuth(user: any):void{
    localStorage.setItem('token', user.token);
    localStorage.setItem('person', String(user.person));
  }

  getAuth():any{
    const token = localStorage.getItem('token');
    const person = localStorage.getItem('person');
    return {token: token, person: Number(person)};
  }
  
  clearAuth():void{
    localStorage.clear();
  } 

  getPerson(): Observable<Person | ErrorMessage>{
    const auth = this.getAuth();
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${auth.token}`,
    });
    return this.http.get<Person | ErrorMessage>(this.url + `/persons/${auth.person}`, {headers:headers});
  }

  async getUser(){
    const person =  await firstValueFrom(this.getPerson()).catch(err => err.error);
    return {name: person.name, photo: this.url + person.photo};
  }

}
