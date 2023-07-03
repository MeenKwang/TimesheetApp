import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotesPerDayDto } from 'src/app/model/notes-per-day-dto';

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
    console.log(weekNumber);
    params = params.append("username", username);
    params = params.append("weekNumber", weekNumber);
    return this.httpClient.get(this.base_url + "notes/notes_by_week", {params : params}).pipe();
  }
}
