import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() type: 'default' | 'success' | 'warning' | 'danger' = 'default';
  @Input() label: string = '';
  @Output() onClickEvent: EventEmitter<any> = new EventEmitter();
  onClick: any = ()=>{this.onClickEvent.emit()};

}
