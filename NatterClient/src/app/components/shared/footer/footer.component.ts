import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../../stores/auth.store';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html'
})

export class FooterComponent {
    year = new Date().getFullYear();

    constructor(public authStore: AuthStore) {}
}
