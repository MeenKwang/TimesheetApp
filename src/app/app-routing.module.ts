import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyTimesheetComponent } from './my-timesheet/my-timesheet.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyAbsenceDayComponent } from './my-absence-day/my-absence-day.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch: "full"},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,
    children : [
      { path: 'timesheet', component: MyTimesheetComponent, canActivate: [AuthGuard], data: { roles: ["STAFF, INTERN"] }, },
      { path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard], data: { roles: ["STAFF, INTERN"] }, },
      { path: 'absence', component: MyAbsenceDayComponent, canActivate: [AuthGuard], data: { roles: ["STAFF, INTERN"] }, }
    ]
  },
  { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
