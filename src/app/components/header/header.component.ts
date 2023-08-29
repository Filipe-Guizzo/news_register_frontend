import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public auth = environment;
  mediaUrl: string = environment.urlApi;

  constructor(
    public userService: UserService){
  }

  ngOnInit(){
  }

  onLogout():void{
    this.userService.clearAuth();
  }

}
