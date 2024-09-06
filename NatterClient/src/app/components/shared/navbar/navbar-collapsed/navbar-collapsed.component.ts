import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ThemeSwitcherComponent } from '../../theme-switcher/theme-switcher.component';
import { initialLoginStatus, LoginStatusModel } from '../../../../models/auth/login.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-navbar-collapsed',
    standalone: true,
    imports: [ThemeSwitcherComponent, RouterLink, RouterLinkActive],
    templateUrl: './navbar-collapsed.component.html'
})
export class NavbarCollapsedComponent {
    @Input({required: true}) currentAuthStatus = signal<LoginStatusModel>(initialLoginStatus);
    @Input({required: true}) isNavCollapsed = signal<boolean>(true);
    @Output() collapseNavbar = new EventEmitter<void>();
}
