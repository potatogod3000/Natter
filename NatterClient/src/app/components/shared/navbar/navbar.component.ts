import { Component, ElementRef, HostListener, OnInit, signal, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, Scroll } from '@angular/router';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { AuthStore } from '../../../stores/auth.store';
import { MatIcon } from '@angular/material/icon';
import { NavbarCollapsedComponent } from './navbar-collapsed/navbar-collapsed.component';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, ThemeSwitcherComponent, MatIcon, NavbarCollapsedComponent, RouterLinkActive],
    templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {
    isNavCollapsed = signal<boolean>(true);
    prevScrollPos = window.pageYOffset;
    @ViewChild('navbar') navSelect!: ElementRef;

    constructor(public authStore: AuthStore) {}

    ngOnInit(): void {}

    @HostListener('window:scroll', ['$event'])
    ScrollCtrl(event: Scroll) {
        let currentScrollPos = window.pageYOffset;
        if (this.prevScrollPos > currentScrollPos) {
            this.navSelect.nativeElement.style.top = '0';
        } else {
            if (!this.isNavCollapsed) {
                this.navSelect.nativeElement.style.top = '-55px';
            }
        }
        this.prevScrollPos = currentScrollPos;
    }

    showCollapsedNav() {
        this.isNavCollapsed.set(false);
    }

    hideCollapsedNav() {
        this.isNavCollapsed.set(true);
    }
}
