import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ServerModel } from '../../../models/chat/server.model';
import { ThemeSwitcherComponent } from '../../shared/theme-switcher/theme-switcher.component';

@Component({
    selector: 'chat-sidebar',
    standalone: true,
    imports: [RouterLink, MatIcon, ThemeSwitcherComponent],
    templateUrl: './sidebar.component.html'
})

export class SidebarComponent {
    @Input({ required: true }) serversJoined: Array<ServerModel> = [];
    @Input() collapsedSidebar: boolean = true;
    @Output() createServer = new EventEmitter<void>();
    @Output() selectServer = new EventEmitter<string>();
    @Output() collapseSidebar = new EventEmitter<boolean>();

    constructor() {}
}
