import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { StudentDashBoardComponent } from 'app/student-dashboard/student-dashboard.component';
import { CourseDashboardComponent } from 'app/course-dashboard/course-dashboard.component';
import { RegisterDashboardComponent } from 'app/register-dashboard/register-dashboard.component';
import { SchedulerDashboardComponent } from 'app/scheduler-dashboard/scheduler-dashboard.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'students',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'student-dashboard',  component: StudentDashBoardComponent },
    { path: 'course-dashboard',  component: CourseDashboardComponent },
    { path: 'register-dashboard',  component: RegisterDashboardComponent },
    { path: 'scheduler-dashboard',  component: SchedulerDashboardComponent },
];
