import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyTimesheetComponent } from './my-timesheet/my-timesheet.component';
import { MyAbsenceDayComponent } from './my-absence-day/my-absence-day.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ConfirmDialogComponent } from './my-timesheet/confirm-dialog/confirm-dialog.component';
import { AbsenceDialogComponent } from './my-absence-day/absence-dialog/absence-dialog.component';
import { AbsenceFormDialogComponent } from './my-absence-day/absence-form-dialog/absence-form-dialog.component';
import { AbsenceConfirmDialogComponent } from './my-absence-day/absence-confirm-dialog/absence-confirm-dialog.component';
import { ManageTimesheetComponent } from './manage-home/manage-timesheet/manage-timesheet.component';
import { ManageAbsenceComponent } from './manage-home/manage-absence/manage-absence.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
@NgModule({
  declarations: [
    AppComponent,
    MyProfileComponent,
    MyTimesheetComponent,
    MyAbsenceDayComponent,
    LoginComponent,
    HomeComponent,
    ForbiddenComponent,
    ConfirmDialogComponent,
    AbsenceDialogComponent,
    AbsenceFormDialogComponent,
    AbsenceConfirmDialogComponent,
    ManageTimesheetComponent,
    ManageAbsenceComponent,
    ManageHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ReactiveFormsModule
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
