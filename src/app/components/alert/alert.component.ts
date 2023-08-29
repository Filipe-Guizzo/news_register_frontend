import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() show: boolean = true;
  @Input() type: 'sucess' | 'danger' | null = null;
  @Output() hide = new EventEmitter<boolean>();

  onClose(): void{
    this.hide.emit(true);
  }

}
