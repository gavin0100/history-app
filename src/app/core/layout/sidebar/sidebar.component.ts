import { Component, model } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DrawerModule, ButtonModule, RippleModule, StyleClassModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  visible = model<boolean>(false);

  menuItems = [
    {
      label: 'FAVORITES',
      items: [
        { label: 'Dashboard', icon: 'pi pi-home', link: '/dashboard' },
        { label: 'Bookmarks', icon: 'pi pi-bookmark', link: '/bookmarks' },
        { label: 'Videos', icon: 'pi pi-video', link: '/videos' },
      ]
    },
    {
      label: 'CONTENT',
      items: [
        { label: 'Articles', icon: 'pi pi-file', link: '/articles' },
        { label: 'Countries', icon: 'pi pi-globe', link: '/countries' },
        { label: 'Events', icon: 'pi pi-calendar', link: '/events' },
      ]
    },
    {
      label: 'SETTINGS',
      items: [
        { label: 'Profile', icon: 'pi pi-user', link: '/profile' },
        { label: 'Settings', icon: 'pi pi-cog', link: '/settings' },
      ]
    }
  ];
}
