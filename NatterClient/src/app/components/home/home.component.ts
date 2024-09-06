import { Component, signal } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { FeaturesComponent } from './features/features.component';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../stores/auth.store';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HeroComponent, FeaturesComponent, RouterLink],
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(public authStore: AuthStore) {}

    ngOnInit(): void {}
}
