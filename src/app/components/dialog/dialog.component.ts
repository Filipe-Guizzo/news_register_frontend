import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() buttons: any =  { confirm: false, cancel: false, continue: false}
  @Input() show: boolean = false;
  @Output() onContinueEvent = new EventEmitter<any>();
  @Output() onConfirmEvent = new EventEmitter<any>();
  @Output() onCancelEvent = new EventEmitter<any>();

  onContinue(): void{
    this.onContinueEvent.emit();
  }

  onConfirm(): void{
    this.onConfirmEvent.emit();
  }

  onCancel(): void{
    this.onCancelEvent.emit();
  }
}
