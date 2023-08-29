import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.css']
})
export class InputSelectComponent {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() value: any;
  @Input() label: string = '';
  @Output() changeEvent = new EventEmitter<any>();
  
  ngOnInit():void{
  }

  onChange(event: any):void{
    this.value = event.target.value;
    this.changeEvent.emit({
      field: this.name,
      value: this.value
    });
  }
}
