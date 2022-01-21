import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mandateStatus'
})
export class MandateStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
