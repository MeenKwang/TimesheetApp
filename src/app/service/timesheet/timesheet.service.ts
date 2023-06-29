import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private base_url = "http://localhost:8081/Timesheet/app/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getTimesheetByWeek(employeeId : number, weekNumber: number) {
    let params : HttpParams = new HttpParams();
    console.log(weekNumber);
    params = params.append("employeeId", employeeId);
    params = params.append("weekNumber", weekNumber - 2);
    return this.httpClient.get(this.base_url + "notes/notes_by_week", {params : params}).pipe();
  }
}
