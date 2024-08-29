import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MatIcon, RouterLink],
  templateUrl: './not-found.component.html',
  styles: ``
})
export class NotFoundComponent {

}
