import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { TabViewModule } from 'primeng/tabview';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
} from '@angular/material';
import { StudentDashBoardComponent } from 'app/student-dashboard/student-dashboard.component';
import { StudentDetailsComponent } from 'app/student-dashboard/student-details/student-details.component';
import { CourseDashboardComponent } from 'app/course-dashboard/course-dashboard.component';
import { RegisterDashboardComponent } from 'app/register-dashboard/register-dashboard.component';
import { SchedulerDashboardComponent } from 'app/scheduler-dashboard/scheduler-dashboard.component';
import { ProductsDashboardComponent } from 'app/products-dashboard/products-dashboard.component';
// import { FullCalendarModule } from '@fullcalendar/angular';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { KeyFilterModule } from 'primeng/keyfilter';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { OverlayComponent } from 'app/overlay/overlay.component';
import { StudentSummaryDialogComponent } from 'app/student-dashboard/student-summary-dialog/student-summary-dialog.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SafeUrlPipe } from './admin-layout.component';
import { StudentNoteDialogComponent } from 'app/student-dashboard/student-note-dialog/student-note-dialog.component';
import { StudentMembershipDialogComponent } from 'app/student-dashboard/student-membership-dialog/student-membership-dialog.component';
import { RegisterCourseDialogComponent } from 'app/student-dashboard/register-course-dialog/register-course-dialog.component';
import { StudentCourseDialogComponent } from 'app/student-dashboard/student-course-dialog/student-course-dialog.component';
import {RadioButtonModule} from 'primeng/radiobutton';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    InputTextModule,
    DialogModule,
    InputTextareaModule,
    CalendarModule,
    InputMaskModule,
    TabViewModule,
    FullCalendarModule,
    HttpClientModule,
    HttpModule,
    KeyFilterModule,
    BlockUIModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    ToastModule,
    RadioButtonModule,
    FullCalendarModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    StudentDashBoardComponent,
    StudentDetailsComponent,
    CourseDashboardComponent,
    RegisterDashboardComponent,
    SchedulerDashboardComponent,
    ProductsDashboardComponent,
    OverlayComponent,
    StudentSummaryDialogComponent,
    SafeUrlPipe,
    StudentNoteDialogComponent,
    StudentMembershipDialogComponent,
    RegisterCourseDialogComponent,
    StudentCourseDialogComponent
  ]
})

export class AdminLayoutModule { }
