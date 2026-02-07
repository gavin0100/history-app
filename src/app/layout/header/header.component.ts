import { Component, output, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { OverlayPanel } from 'primeng/overlaypanel';
import { PopoverModule } from 'primeng/popover';
import { Popover } from 'primeng/popover';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, PopoverModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  toggleClick = output<void>();
  @ViewChild('userMenu') userMenu!: Popover;

  userInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'pi pi-user' // or URL to avatar image
  };

  onMenuClick() {
    this.toggleClick.emit();
  }

    onUserClick(event: Event) {
    this.userMenu.toggle(event);
  }

  onLogout() {
    // Implement logout logic here
    console.log('Logging out...');
    this.userMenu.hide();
  }

  onChangeAppearance(theme: string) {
    // Implement appearance change logic here
    console.log('Changing appearance to:', theme);
  }
}
