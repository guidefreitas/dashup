import { Routes, RouterModule } from '@angular/router';
import { FeedsComponent } from './feeds.component';
import { FeedDetailComponent } from './feed.detail.component'

export const routes: Routes = [
    { path: 'feeds', component: FeedsComponent },
    { path: 'feeds/:id', component: FeedDetailComponent }
];

export const feedsRouting = RouterModule.forChild(routes);