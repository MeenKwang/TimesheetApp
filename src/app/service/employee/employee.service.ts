import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private base_url = "http://localhost:8081/Timesheet/app/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getStaffPage(buddyId : number, pageNumber : number, pageSize : number, nameSearch : string, sortField : string, sortOrder : string) {
    let params : HttpParams = new HttpParams();
    params = params.append("buddyId", buddyId);
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("nameSearch", nameSearch);
    params = params.append("sortField", sortField);
    params = params.append("sortOrder", sortOrder);
    return this.httpClient.get(this.base_url + "employees/view_staff", { params : params }).pipe();
  }
}
