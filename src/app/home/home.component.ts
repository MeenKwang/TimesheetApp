import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getTimesheetToken() {
    return this.cookieService.get("TimesheetAppToken");
  }

  logout() {
    this.cookieService.delete("TimesheetAppToken");
    this.cookieService.delete("TimesheetAppRefreshToken");
    this.cookieService.delete("TimesheetAppUsername");
    this.cookieService.delete("TimesheetAppEmployeeId");
    this.router.navigate(["login"]);
  }

}
