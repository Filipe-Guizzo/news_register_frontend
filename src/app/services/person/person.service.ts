import { UserService } from 'src/app/services/user/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ErrorMessage } from 'src/app/interfaces/message';
import { Person } from 'src/app/interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  url: string = environment.urlApi;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    ) { 
  }

  getAll(): Observable<Person[] | ErrorMessage>{
    const auth = this.userService.getAuth();
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${auth.token}`,
    });
    return this.http.get<Person[] | ErrorMessage>(this.url + `/persons/`, {headers: headers});
  }

  get(id: number): Observable<Person | ErrorMessage>{
    const auth = this.userService.getAuth();
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${auth.token}`,
    });
    return this.http.get<Person | ErrorMessage>(this.url + `/persons/${id}/`, {headers: headers});
  }

  create(person: Person): Observable<Person | ErrorMessage>{
    return this.http.post<Person | ErrorMessage>(this.url + '/persons/', person);
  }

  update(id: number, person: Person): Observable<Person | ErrorMessage>{
    const auth = this.userService.getAuth();
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${auth.token}`,
    });
    return this.http.put<Person | ErrorMessage>(this.url + `/persons/${id}/`, person, {headers: headers});
  }

  delete(id: number): Observable<any | ErrorMessage>{
    const auth = this.userService.getAuth();
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${auth.token}`,
    });
    return this.http.delete<any | ErrorMessage>(this.url + `/persons/${id}/`, {headers: headers});
  }

  uploadFile(id: number,file: File): Observable<Person | ErrorMessage>{
    const auth = this.userService.getAuth();
    const formData = new FormData();
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${auth.token}`,
    });
    
    formData.append('file', file);
    return this.http.post<Person | ErrorMessage>(this.url + `/persons/${id}/upload-file/`, formData, {headers: headers});
  }

}
