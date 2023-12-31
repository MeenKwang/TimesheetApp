import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { AbsenceViewDto } from 'src/app/model/absence-view-dto';
import { AbsenceService } from 'src/app/service/absence/absence.service';
import { AbsenceFormDialogComponent } from '../absence-form-dialog/absence-form-dialog.component';
import { AbsenceConfirmDialogComponent } from '../absence-confirm-dialog/absence-confirm-dialog.component';

@Component({
  selector: 'app-absence-dialog',
  templateUrl: './absence-dialog.component.html',
  styleUrls: ['./absence-dialog.component.scss']
})
export class AbsenceDialogComponent implements OnInit {

  orderForm!: FormGroup;
  absenceViewDto!: AbsenceViewDto[];
  
  constructor(
    private dialogRef: MatDialogRef<AbsenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cookieService : CookieService,
    private absenceService : AbsenceService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const date = this.data.date as Date;
    this.listAllAbsenceRequestInThisDateOfEmployee(date, Number(this.cookieService.get("TimesheetAppEmployeeId")));
  }

  listAllAbsenceRequestInThisDateOfEmployee(date : Date, employeeId : number) {
    this.absenceService.listAllAbsenceRequestInThisDateOfEmployee(date, employeeId).subscribe({
      next : (response) => {
        this.absenceViewDto = response;
        console.log(this.absenceViewDto);
      }
    });
  }

  editAbsenceRequest(id : number | null, type : string | null) {
    console.log(type);
    const dialogRef = this.dialog.open(AbsenceFormDialogComponent, {
      data: { employeeId : this.cookieService.get("TimesheetAppEmployeeId") , absenceId : id , type : type},
    });
    dialogRef.afterClosed().subscribe(
      (response) => {
        const date = this.data.date as Date;
        this.listAllAbsenceRequestInThisDateOfEmployee(date, Number(this.cookieService.get("TimesheetAppEmployeeId")));
      }
    )
  }

  deleteAbsenceRequest(id : number | null, status : string | null) {
    if(status) {
      if(status === 'PENDING') {
        const dialogRef = this.dialog.open(AbsenceConfirmDialogComponent, {
          data: {absenceId : id}
        });
        dialogRef.afterClosed().subscribe(
          (response) => {
            const date = this.data.date as Date;
            this.listAllAbsenceRequestInThisDateOfEmployee(date, Number(this.cookieService.get("TimesheetAppEmployeeId")));
          }
        )
      }
    }
  }

}
