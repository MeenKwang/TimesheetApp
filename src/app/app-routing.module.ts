import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyTimesheetComponent } from './my-timesheet/my-timesheet.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyAbsenceDayComponent } from './my-absence-day/my-absence-day.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ManageTimesheetComponent } from './manage-home/manage-timesheet/manage-timesheet.component';
import { ManageAbsenceComponent } from './manage-home/manage-absence/manage-absence.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';

const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch: "full"},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,
    children : [
      { path: 'timesheet', component: MyTimesheetComponent, canActivate: [AuthGuard], data: { roles: ["STAFF, INTERN"] }, },
      { path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard], data: { roles: ["STAFF, INTERN"] }, },
      { path: 'absence', component: MyAbsenceDayComponent, canActivate: [AuthGuard], data: { roles: ["STAFF, INTERN"] }, },
      { path: 'manage_home', component: ManageHomeComponent, canActivate: [AuthGuard], data: { roles: ["PM, HR"] }, children : [
        { path: 'manage_timesheet', component: ManageTimesheetComponent, canActivate: [AuthGuard], data: { roles: ["PM, HR"] }, },
        { path: 'manage_absence', component: ManageAbsenceComponent, canActivate: [AuthGuard], data: { roles: ["PM, HR"] }, }
      ]},
    ]
  },
  { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
