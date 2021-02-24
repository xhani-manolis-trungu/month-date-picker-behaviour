import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import {MatDatepicker} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'YYYY MM',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  },
};

/** @title Datepicker emulating a Year and month picker */
@Component({
  selector: 'datepicker-views-selection-example',
  templateUrl: 'datepicker-views-selection-example.html',
  styleUrls: ['datepicker-views-selection-example.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DatepickerViewsSelectionExample {
  date = new FormControl(moment());
  canChooseDay = new FormControl(true);
  
  chosenYearHandler(normalizedYear: Moment) {
    const year = moment(normalizedYear).year();
    const ctrlValue = this.date.value;
    ctrlValue.year(year);
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) 
  { 
    if (!this.canChooseDay.value) {
      console.log(MAT_DATE_FORMATS);
    } 
    const month = moment(normlizedMonth).month();
    const date = moment(this.date.value);
    const ctrlValue = new Date(date.year() , month);
    this.date.patchValue(ctrlValue);
    if (!this.canChooseDay.value)  datepicker.close();
  }

}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */