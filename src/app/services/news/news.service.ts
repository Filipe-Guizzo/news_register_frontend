import { UserService } from 'src/app/services/user/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ErrorMessage } from 'src/app/interfaces/message';
import { News, NewsIn } from 'src/app/interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  url: string = environment.urlApi;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getAll(): Observable<News[] | ErrorMessage>{
    const auth = this.userService.getAuth();
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${auth.token}`,
    });
    return this.http.get<News[] | ErrorMessage>(this.url + '/news/', {headers: headers});
  }

  get(id: number): Observable<News | ErrorMessage>{
    const auth = this.userService.getAuth();
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${auth.token}`,
    });
    return this.http.get<News | ErrorMessage>(this.url + `/news/${id}/`, {headers: headers});
  }

  search(value: string): Observable<News[] | ErrorMessage>{
    const auth = this.userService.getAuth();
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${auth.token}`,
    });
    return this.http.get<News[] | ErrorMessage>(this.url + `/news/search/?title=${value}&subtitle=${value}&content=${value}&category=${value}&person=${value}`, {headers: headers});
  }

  create(news: NewsIn): Observable<News | ErrorMessage>{
    const auth = this.userService.getAuth();
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${auth.token}`,
    });
    return this.http.post<News | ErrorMessage>(this.url + '/news/', news, {headers: headers});
  }

  update(id: number, news: NewsIn): Observable<News | ErrorMessage>{
    const auth = this.userService.getAuth();
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${auth.token}`,
    });
    return this.http.put<News | ErrorMessage>(this.url + `/news/${id}/`, news, {headers: headers});
  }

  delete(id: number): Observable<any>{
    const auth = this.userService.getAuth();
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${auth.token}`,
    });
    return this.http.delete<any>(this.url + `/news/${id}/`, {headers: headers});
  }

  uploadFile(id: number,file: File): Observable<News | ErrorMessage>{
    const auth = this.userService.getAuth();
    const formData = new FormData();
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${auth.token}`,
    });
    
    formData.append('file', file);
    return this.http.post<News | ErrorMessage>(this.url + `/news/${id}/upload-file/`, formData, {headers: headers});
  }
}
