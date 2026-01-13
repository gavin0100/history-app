import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Your feature routes here
      { path: '', redirectTo: 'articles', pathMatch: 'full' },
      // Add your article, admin routes etc.
    ],
  },
];
