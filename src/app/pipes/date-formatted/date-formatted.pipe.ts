import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatted'
})
export class DateFormattedPipe implements PipeTransform {

  transform(value: string): string {
    if(value === undefined || value == null){
      return value;
    }
    const date = value.split('-');
    const [ year, month, day ] =  date;
    const dateFormatted = `${day}/${month}/${year}`;
    return dateFormatted;
  }

}
