import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';
import { Category, CategoryIn } from 'src/app/interfaces/category';
import { ErrorMessage } from 'src/app/interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url: string = environment.urlApi;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getAll(): Observable<Category[] | ErrorMessage>{
    const auth = this.userService.getAuth();
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${auth.token}`,
    });

    return this.http.get<Category[] | ErrorMessage>(this.url + '/categorys/', {headers:headers});
  }

  get(id: number): Observable<Category | ErrorMessage>{
    const auth = this.userService.getAuth();
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${auth.token}`,
    });

    return this.http.get<Category | ErrorMessage>(this.url + `/categorys/${id}`, {headers:headers});
  }

  create(category: CategoryIn): Observable<Category | ErrorMessage>{
    const auth = this.userService.getAuth();
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${auth.token}`,
    });

    return this.http.post<Category | ErrorMessage>(this.url + '/categorys/', category, {headers:headers});
  }

  update(id: number, category: CategoryIn): Observable<Category | ErrorMessage>{
    const auth = this.userService.getAuth();
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${auth.token}`,
    });

    return this.http.put<Category | ErrorMessage>(this.url + `/categorys/${id}/`, category, {headers:headers});
  }

  delete(id: number): Observable<any | ErrorMessage>{
    const auth = this.userService.getAuth();
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${auth.token}`,
    });

    return this.http.delete<any | ErrorMessage>(this.url + `/categorys/${id}/`, {headers:headers});
  }

}
