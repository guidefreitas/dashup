import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    { path: 'signup', component: SignupComponent }
];

export const authRouting = RouterModule.forChild(routes);