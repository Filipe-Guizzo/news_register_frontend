import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit{
  @Input() type: 'text' | 'password' | 'email' | 'date' = 'text';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() value: any = '';
  @Input() label: string = '';
  @Input() setVisible: boolean = false;
  @Input() mask: boolean = false;
  @Input() maskType: 'date' | 'fone' | null = null;
  @Input() maxLength: number = 100;
  @Output() changeEvent = new EventEmitter<any>();
  
  ngOnInit():void{
    this.type = this.setVisible == true ? 'password':'text';
  }

  onChange(event: any):void{
    this.value = event.target.value;
    this.changeEvent.emit({
      field: this.name,
      value: this.value
    });
  }

  onSetPasswordVisible() :void {
    this.type = this.type == 'password' ? 'text' : 'password';
  }

  onSetMask(event: any): void{
    if(this.mask && this.maskType != null){
      switch(this.maskType){
        case 'date':
          this.maxLength = 10;
          this.value = event.target.value;
          this.value.length == 2 || this.value.length == 5? this.value += "/": this.value;
          break;
        default:
          this.value = event.target.value;
          break;
      }
    }
  }
}
