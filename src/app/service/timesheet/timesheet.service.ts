import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteFormDto } from 'src/app/model/note-form-dto';
import { NotesPerDayDto } from 'src/app/model/notes-per-day-dto';
import { ProjectSelectDto } from 'src/app/model/project-select-dto';
import { TaskSelectDto } from 'src/app/model/task-select-dto';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private base_url = "http://localhost:8081/Timesheet/app/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getTimesheetByWeek(username : string, weekNumber: number) : Observable<Object> {
    let params : HttpParams = new HttpParams();
    params = params.append("username", username);
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

}
