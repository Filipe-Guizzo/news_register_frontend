import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-code',
  templateUrl: './input-code.component.html',
  styleUrls: ['./input-code.component.css']
})
export class InputCodeComponent implements OnInit{
  @Input() numberCodes: number = 0;
  @Output() changeEvent = new EventEmitter<any>();
  codes: Array<number> = [];
  code: string = '';

  ngOnInit(): void{
    this.codes = [...Array(this.numberCodes).keys()]
  }

  onChange(event: any):void{
    const code = event.target.value;
    const name = event.target.attributes[5].value;
    this.changeEvent.emit({
      field: name,
      value: code
    })
  }
}
