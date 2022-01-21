import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: Date): string {
    let today = moment();
            let duration = moment(value);
            let years = today.diff(duration, 'years');
            let html:string = years + " yr ";

            html += today.subtract(years, 'years').diff(duration, 'months') + " mo";

    return html;
}

}
