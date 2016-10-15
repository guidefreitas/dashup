import { Routes, RouterModule } from '@angular/router';
import { FeedsComponent } from './feeds.component';

export const routes: Routes = [
    { path: 'feeds', component: FeedsComponent }
];

export const feedsRouting = RouterModule.forChild(routes);