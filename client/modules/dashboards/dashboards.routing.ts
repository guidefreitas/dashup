import { Routes, RouterModule } from '@angular/router';
import { DashboardsComponent } from './dashboards.component';

export const routes: Routes = [
    { path: 'dashboards', component: DashboardsComponent }
];

export const dashboardsRouting = RouterModule.forChild(routes);