import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimesheetService } from 'src/app/service/timesheet/timesheet.service';

@Component({
  selector: 'app-absence-dialog',
  templateUrl: './absence-dialog.component.html',
  styleUrls: ['./absence-dialog.component.scss']
})
export class AbsenceDialogComponent implements OnInit {

  orderForm!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<AbsenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private timesheetService: TimesheetService,
  ) { }

  ngOnInit(): void {
    
    this.orderForm = this.formBuilder.group({
      items: new FormArray([])
    });
    this.addAbsenceRequestToArray();
  }

  createAbsenceRequest() : FormGroup {
    return this.formBuilder.group({
      absenceType : new FormControl({value : null, disabled : true}, Validators.required),
      absenceTypeOff : new FormControl({value : null, disabled : true}, Validators.required),
      typeTimeOff : new FormControl({value : null, disabled : true}, Validators.required),
      timeOff : new FormControl({value : null, disabled : true}, Validators.required),
      reason : new FormControl({value : null, disabled : true}, Validators.required),
      timeRequest : new FormControl({value : null, disabled : true}, Validators.required),
      disable : new FormControl({value : null, disabled : true})
    });
  }

  addAbsenceRequestToArray() {
    let items = this.orderForm.controls["items"] as FormArray;
    items.push(this.createAbsenceRequest());
  }

  get absenceItems() : FormArray {
    return this.orderForm.controls["items"] as FormArray;
  }

  submitForm() {

  }

  onNoClick() {
    this.dialogRef.close();
  }

}
