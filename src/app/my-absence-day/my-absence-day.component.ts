import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { NgIf } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AbsenceDialogComponent } from './absence-dialog/absence-dialog.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-my-absence-day',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-absence-day.component.html',
  styleUrls: ['./my-absence-day.component.scss']
})
export class MyAbsenceDayComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  events: CalendarEvent<any>[] = [];
  
  constructor(
    private dialog: MatDialog,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    const dialogRef = this.dialog.open(AbsenceDialogComponent, {
      data: { employeeId : this.cookieService.get("TimesheetAppEmployeeId") , date : date },
    });

    dialogRef.afterClosed().subscribe({
        next : (response) => console.log("OK")
    });
  }

  closeOpenMonthViewDay() {

  }
}