import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber } from 'libphonenumber-js';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: number, args?: string): any {
    if (!value) {
      return value;
    }

    let phone = parsePhoneNumber("+57"+value.toString());

    return phone.format('NATIONAL');
}

}
