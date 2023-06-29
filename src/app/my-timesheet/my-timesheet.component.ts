
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { TimesheetService } from '../service/timesheet/timesheet.service';
import { MatDialog } from '@angular/material/dialog';
import { TimesheetDialogComponent } from './timesheet-dialog/timesheet-dialog.component';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD-MM-YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD-MM-YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};


@Component({
  selector: 'app-my-timesheet',
  templateUrl: './my-timesheet.component.html',
  styleUrls: ['./my-timesheet.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ]
})
export class MyTimesheetComponent implements OnInit {

  daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  daysArraySummary = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  selectedDate = new Date();
  selectedDay = this.selectedDate.getDay();
  selectedMonthSummary! : number | any;
  dateString : String = '';
  dates : Date[] = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  animal!: string;
  name!: string;

  timeSheet : any = null;

  constructor(
    private timesheetService : TimesheetService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.selectedMonthSummary = this.selectedDate.getMonth();
    this.dates = this.getAllDatesInMonth(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
    this.timesheetService.getTimesheetByWeek(1, this.getWeekNumberOfSelectedDate(this.selectedDate)).subscribe({
      next : (response) => {
        console.log(response);
        this.timeSheet = response;
      },
      error : (error) => {

      },
      complete : () => {}
    });
  }

  getDay(date : Date) {
    return date.getDay();
  }

  getDate(date : Date) {
    return date.getDate();
  }

  getMonth(date : Date) {
    return date.getMonth();
  }

  getYear(date : Date) {
    return date.getFullYear();
  }

  getWeekNumberOfSelectedDate(date : Date) {
    let startDate = new Date(date.getFullYear(), 0, 1);
    var days = Math.floor((date.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000));
    
    var weekNumber = Math.ceil(days / 7);
    return weekNumber;
  }

  getWeekNumberAndUpdateDay(date : any) {
    // let currentYear = date.getFullYear();
    console.log(date);
    this.selectedDate = date.toDate();
    console.log(this.selectedDate);
    let startDate = new Date(date._i.year, 0, 1);
    var days = Math.floor((date.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000));
    
    var weekNumber = Math.ceil(days / 7);
    
    // Display the calculated result      
    console.log("Week number is : " + weekNumber);

    this.selectedDay = date._d.getDay();
    console.log(this.selectedDay);
  }

  getAllDatesInMonth(year: number, month: number): Date[] {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
  
    const dates = [];
  
    for (let date = firstDayOfMonth; date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
      dates.push(new Date(date));
    }
  
    return dates;
  }

  returnCurrentDay() {
    this.selectedDate = new Date();
    this.selectedDay = this.selectedDate.getDay();
  }

  minusOneDay() {
    this.selectedDate = new Date(this.selectedDate.setDate(this.selectedDate.getDate() - 1));
    this.selectedDay = this.selectedDate.getDay();
  }

  plusOneDay() {
    this.selectedDate = new Date(this.selectedDate.setDate(this.selectedDate.getDate() + 1));
    this.selectedDay = this.selectedDate.getDay();
  }

  returnSelectedDate(index : number) {
    let difference = this.selectedDate.getDay() - index;
    this.selectedDate = new Date(this.selectedDate.setDate(this.selectedDate.getDate() - difference));
    console.log(this.selectedDate);
    this.selectedDay = this.selectedDate.getDay();
  }

  showTimesheetForm() {
    const dialogRef = this.dialog.open(TimesheetDialogComponent, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
