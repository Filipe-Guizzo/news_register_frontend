import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css']
})
export class InputFileComponent implements OnInit {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() value?: File;
  @Output() onChangeEvent = new EventEmitter<any>();
  
  ngOnInit(): void {
  }

  onChange(event: any){
    this.value = event.target.files[0];
    this.onChangeEvent.emit({
      field: 'file',
      value:this.value});
  }

  onGetName(name: string){
    const nameSplit =  name.split('/');
    return nameSplit[nameSplit.length - 1];
  }

}
