import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent {
  @Output() changeEvent = new EventEmitter<any>();

  onChange(event: any):void{
    const value = event.target.value;
    this.changeEvent.emit(value);
  }
}
