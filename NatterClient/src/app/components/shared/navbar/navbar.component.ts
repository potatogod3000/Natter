import { Component, computed, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterLink, Scroll } from '@angular/router';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { AuthStore } from '../../../stores/auth.store';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, ThemeSwitcherComponent],
    templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {
    showCollapsedNav = false;
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
            if (!this.showCollapsedNav) {
                this.navSelect.nativeElement.style.top = '-55px';
            }
        }
        this.prevScrollPos = currentScrollPos;
    }
}
