import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [RouterLink, RouterOutlet],
    templateUrl: './profile.component.html',
})

export class ProfileComponent {
    constructor() {}
}
