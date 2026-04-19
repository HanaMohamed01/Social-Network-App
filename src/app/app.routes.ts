import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { NotificationComponent } from './features/notification/notification.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { FeedComponent } from './features/feed/feed.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forget', component: ForgotPasswordComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'feed', component: FeedComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'change', component: ChangePasswordComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
