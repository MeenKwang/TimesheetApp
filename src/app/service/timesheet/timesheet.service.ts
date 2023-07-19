import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckInDto } from 'src/app/model/check-in-dto';
import { CheckInRequestDto } from 'src/app/model/check-in-request-dto';
import { NoteFormDto } from 'src/app/model/note-form-dto';
import { NoteSummaryRequestDto } from 'src/app/model/note-summary-request-dto';
import { NotesPerDayDto } from 'src/app/model/notes-per-day-dto';
import { ProjectSelectDto } from 'src/app/model/project-select-dto';
import { TaskSelectDto } from 'src/app/model/task-select-dto';
import { TimeSheetStatus } from 'src/app/my-timesheet/timesheet-dialog/timesheet-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private base_url = "http://localhost:8081/Timesheet/app/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getTimesheetByWeek(employeeId : number, weekNumber: number) : Observable<Object> {
    let params : HttpParams = new HttpParams();
    params = params.append("employeeId", employeeId);
    params = params.append("weekNumber", weekNumber);
    return this.httpClient.get(this.base_url + "notes/notes_by_week", {params : params}).pipe();
  }

  public getListProjectForTimesheetForm() : Observable<ProjectSelectDto> {
    return this.httpClient.get(this.base_url + "notes/project_for_form").pipe();
  }

  public getListTaskForSelectedProject(projectId : number) : Observable<TaskSelectDto> {
    let params : HttpParams = new HttpParams();
    params = params.append("projectId", projectId);
    return this.httpClient.get(this.base_url + "notes/task_for_form", {params : params}).pipe();
  }

  public getTimesheetById(noteId: number) : Observable<NoteFormDto> {
    console.log(noteId);
    let params : HttpParams = new HttpParams();
    params = params.append("noteId", noteId);
    return this.httpClient.get(this.base_url + "notes/note_by_id", { params : params }).pipe();
  }

  public saveTimesheet(noteFormDto: NoteFormDto) : Observable<any> {
    return this.httpClient.post(this.base_url + "notes/save", noteFormDto).pipe();
  }

  public getEmployeeId() : Observable<any> {
    return this.httpClient.get(this.base_url + "employees/employee_id").pipe();
  }

  public deleteTimesheet(noteId : number) : Observable<any> {
    console.log(noteId);
    let params : HttpParams = new HttpParams();
    params = params.append("noteId", noteId);
    return this.httpClient.get(this.base_url + "notes/delete", { params : params }).pipe();
  }

  public submitWeekForApproved(weekNumber : number) : Observable<any> {
    let params : HttpParams = new HttpParams();
    params = params.append("currentWeekNumber", weekNumber);
    return this.httpClient.get(this.base_url + "notes/submit_week_for_approved", { params : params }).pipe();
  }

  public getNoteSummaryPerMonth(request : NoteSummaryRequestDto) : Observable<any> {
    return this.httpClient.post(this.base_url + "notes/note_summary", request).pipe();
  }

  public getCheckInSummaryPerMonth(request : CheckInRequestDto) : Observable<any> {
    return this.httpClient.post(this.base_url + "checkin/checkin_per_month", request).pipe();
  }

  public getNumberOfEmployeeOpenTalks(request : CheckInRequestDto) : Observable<any> {
    return this.httpClient.post(this.base_url + "notes/open_talk_count", request).pipe();
  }

  public saveCheckpointTime(employeeId : number) : Observable<any> {
    let params : HttpParams = new HttpParams();
    params = params.append("employeeId", employeeId);
    params = params.append("checkPointTime", new Date().toISOString());
    return this.httpClient.get(this.base_url + "checkin/save_checkpoint_time", { params : params }).pipe();
  }

  public getStaffTimesheetByTime(staffId : number, month : number, year : number) : Observable<any> {
    let params : HttpParams = new HttpParams();
    params = params.append("staffId", staffId);
    params = params.append("month", month + 1);
    params = params.append("year", year);
    return this.httpClient.get(this.base_url + "notes/staff_timesheet_by_month", { params : params }).pipe();
  }
  
  public updateStaffTimesheetStatus(noteId : number, status : TimeSheetStatus) {
    console.log(noteId);
    let params : HttpParams = new HttpParams();
    params = params.append("noteId", noteId);
    params = params.append("status", status);
    return this.httpClient.put(this.base_url + "notes/update_staff_timesheet_status", null, {params : params}).pipe();
  }

}
