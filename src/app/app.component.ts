import { Component, OnInit } from '@angular/core';
import { environment } from './environments/environment';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'news_register';
  public auth = environment;

  constructor(
    private userService: UserService
  ){}

  async ngOnInit(){
    const auth = await this.userService.getAuth();
    if( auth.token != undefined ){
      const user = await this.userService.getUser();
      this.auth.setAuthenticated(true);
      this.auth.setUser(user);
    }
  }
}
