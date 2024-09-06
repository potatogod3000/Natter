import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../../stores/auth.store';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './hero.component.html'
})

export class HeroComponent implements OnInit {
    constructor(public authStore: AuthStore) {}

    ngOnInit(): void {}
}
