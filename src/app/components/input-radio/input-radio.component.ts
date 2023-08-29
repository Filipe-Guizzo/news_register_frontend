import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RadioButton } from './interfaces/radio-button';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.css']
})
export class InputRadioComponent {
  @Input() id: string | null = null;
  @Input() name: string | null = null;
  @Input() label: string | null = null;
  @Input() radios: RadioButton[] = [];
  @Input() value: string = '';
  @Output() changeEvent = new EventEmitter<any>();

  onChange(event: any): void{
    this.value = event.target.value;
    this.changeEvent.emit({
      field: this.name,
      value: this.value
    });
  }
}
