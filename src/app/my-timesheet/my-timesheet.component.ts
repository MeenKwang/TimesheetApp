
import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { TimesheetService } from '../service/timesheet/timesheet.service';
import { MatDialog } from '@angular/material/dialog';
import { TimesheetDialogComponent } from './timesheet-dialog/timesheet-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { NoteViewDto } from '../model/note-view-dto';
import { BehaviorSubject, switchMap } from 'rxjs';
import { NotesPerDayDto } from '../model/notes-per-day-dto';

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
export class MyTimesheetComponent implements OnInit, OnChanges {

  daysArray = [{ label: 'Monday', value: 1 }, { label: 'Tuesday', value: 2 }, { label: 'Wednesday', value: 3 }, { label: 'Thursday', value: 4 }, { label: 'Friday', value: 5 }, { label: 'Saturday', value: 6 }, { label: 'Sunday', value: 0 }];
  daysArraySummary = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  selectedDate = new Date();
  selectedDay = this.selectedDate.getDay();
  selectedDayIndex = this.getSelectedDayIndex();
  selectedMonthSummary!: number | any;
  dateString: String = '';
  dates: Date[] = [];

  notesPerDayDtos: NotesPerDayDto[] = [];

  name: string = "Quang";

  weekNumber: number = this.getWeekNumberOfSelectedDate(new Date());

  constructor(
    private timesheetService: TimesheetService,
    public dialog: MatDialog,
    private cookieService: CookieService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Jump to onChanges");
  }

  ngOnInit(): void {
    this.selectedMonthSummary = this.selectedDate.getMonth();
    this.dates = this.getAllDatesInMonth(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
    this.loadTimesheet();
    console.log("init ok");
  }

  loadTimesheet() {
    this.timesheetService.getTimesheetByWeek(this.cookieService.get("TimesheetAppUsername"), this.getWeekNumberOfSelectedDate(this.selectedDate)).subscribe({
      next: (response: any) => {
        this.notesPerDayDtos = response;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => { }
    });
  }

  getNotesPerDay(index : any) {
    for(let item of this.notesPerDayDtos) {
      let date : Date = new Date(item.dateSubmit[0], item.dateSubmit[1] - 1, item.dateSubmit[2]);
      let dateNumber = date.getDay();
      let currentSelectedDateNumber = this.daysArray[index].value; 
      if(dateNumber == currentSelectedDateNumber && item !== null) {
        return item;
      }
    }
    return null;
  }

  getSelectedDayIndex(): number {
    let index = this.selectedDay - 1;
    if (index < 0) index = 6;
    return index;
  }

  getDay(date: Date) {
    return date.getDay();
  }

  getDate(date: Date) {
    return date.getDate();
  }

  getMonth(date: Date) {
    return date.getMonth();
  }

  getYear(date: Date) {
    return date.getFullYear();
  }

  getWeekNumberOfSelectedDate(date: Date) {
    let startDate = new Date(date.getFullYear(), 0, 1);
    var days = Math.floor((date.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000));
    var weekNumber = Math.ceil(days / 7);
    return weekNumber;
  }

  getWeekNumberAndUpdateDay(date: any) {
    this.selectedDate = date.toDate();
    this.selectedDay = date._d.getDay();
    this.selectedDayIndex = this.getSelectedDayIndex();
    this.checkLoadTimesheet();
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
    this.selectedDayIndex = this.getSelectedDayIndex();
    this.checkLoadTimesheet();
  }

  minusOneDay() {
    this.selectedDate = new Date(this.selectedDate.setDate(this.selectedDate.getDate() - 1));
    this.selectedDay = this.selectedDate.getDay();
    this.selectedDayIndex = this.getSelectedDayIndex();
    this.checkLoadTimesheet();
  }

  plusOneDay() {
    this.selectedDate = new Date(this.selectedDate.setDate(this.selectedDate.getDate() + 1));
    this.selectedDay = this.selectedDate.getDay();
    this.selectedDayIndex = this.getSelectedDayIndex();
    this.checkLoadTimesheet();
  }

  returnSelectedDate(event: MatTabChangeEvent) {
    if (event.index === 7) return;
    let dayNum = this.selectedDate.getDay();
    if (dayNum === 0) dayNum = 7;
    let difference = dayNum - 1 - event.index;
    this.selectedDate = new Date(this.selectedDate.setDate(this.selectedDate.getDate() - difference));
    this.selectedDay = this.selectedDate.getDay();
    this.selectedDayIndex = this.getSelectedDayIndex();
    this.checkLoadTimesheet();
  }

  checkLoadTimesheet() {
    if (this.weekNumber !== this.getWeekNumberOfSelectedDate(this.selectedDate)) {
      this.weekNumber = this.getWeekNumberOfSelectedDate(this.selectedDate);
      this.loadTimesheet();
    }
  }

  showTimesheetForm(item : number | undefined) {
    this.timesheetService.getEmployeeId().subscribe({
      next: (response) => {
        const dialogRef = this.dialog.open(TimesheetDialogComponent, {
          data: { noteId : item , employeeId : response },
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log("Dialog closed!");
        });
        
      },
      error: (error) => {
        console.log(error);
        return;
      }
    });
  }

  showDeleteNotify() {
    
  }

}
