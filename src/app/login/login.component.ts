import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../service/auth/auth.service';
import { AuthRequest } from '../model/auth-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  auth : AuthRequest = new AuthRequest('', '');
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if(this.cookieService.check("TimesheetAppToken") === true) {
      this.router.navigate(["/home"]);
    }
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    this.auth.setUsername(this.form.controls["username"].value)
    this.auth.setPassword(this.form.controls["password"].value)
    this.authService.doLogin(this.auth).subscribe(
      (response: any) => {
        if(response === 'UNAUTHORIZED') {
          alert("WTF BRO ???");
          return;
        } else {
        this.cookieService.set("TimesheetAppToken", response.accessToken);
        this.cookieService.set("TimesheetAppRefreshToken", response.refreshToken);
        this.cookieService.set("TimesheetAppUsername", response.email);
        console.log(response.accessToken);
        console.log(response.refreshToken);
        this.router.navigate(["/home/timesheet"]);
        }
      }
    );
  }

}
