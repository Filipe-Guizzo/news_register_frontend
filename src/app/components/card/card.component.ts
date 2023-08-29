import { Component, Input } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { News } from 'src/app/interfaces/news';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  url: string = environment.urlApi;
  @Input() news?: News;
}
