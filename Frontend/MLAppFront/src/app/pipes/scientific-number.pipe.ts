import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scientificNumber'
})
export class ScientificNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let num = Number.parseFloat(value);
    
    return num.toExponential(3);;
  }

}
