import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServerModel } from '../../../models/chat/server.model';

@Component({
    selector: 'chat-server',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './server.component.html'
})

export class ServerComponent {
    @Input({required: true}) serverData: ServerModel = {
        name: "",
        img: ""
    };

    chatMessage: string = "";
}
