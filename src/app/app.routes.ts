import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { LoginComponent } from './features/login/login.component';
import { articlesGuardGuard } from './core/guards/articles-guard.guard';

export const routes: Routes = [
  {
    path: 'articles',
    title: 'Articles',
    component: LayoutComponent,
    canActivate: [articlesGuardGuard]
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '/articles'
  },
];
