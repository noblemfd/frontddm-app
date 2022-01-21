import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'whoToCharge'
})
export class WhoToChargePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
