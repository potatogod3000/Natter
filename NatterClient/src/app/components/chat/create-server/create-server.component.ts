import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServerModel } from '../../../models/chat/server.model';

@Component({
    selector: 'app-create-server',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './create-server.component.html'
})

export class CreateServerComponent {
    serverModel: ServerModel = {
        name: "",
        description: "",
        img: ""
    };
}
