import { Component, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, BreadcrumbModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  toggleSidebar = output<void>();

  breadcrumbItems: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Articles', routerLink: '/articles' },
    { label: 'List' }
  ];

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  onMenuClick() {
    this.toggleSidebar.emit();
  }
}
