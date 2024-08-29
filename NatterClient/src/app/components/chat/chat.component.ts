import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ServerComponent } from './server/server.component';
import { initialServerModel, ServerModel } from '../../models/chat/server.model';
import { ServerService } from '../../services/chat/server.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChatHubService } from '../../services/signalr/signalr.service';
import { AppStore } from '../../stores/app.store';

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [SidebarComponent, ServerComponent],
    templateUrl: './chat.component.html'
})

export class ChatComponent implements OnInit, OnDestroy {
    serverData = signal<ServerModel>(initialServerModel);

    serversJoined = signal<Array<ServerModel>>([]);

    constructor(private _serverService: ServerService,
        private _chatHubService: ChatHubService,
        private _router: Router,
        public appStore: AppStore)
    {}

    ngOnInit(): void {
        this.initChatHub();
        this.getJoinedServers();
        this.appStore.hideNavBars();
    }

    ngOnDestroy(): void {
        this.appStore.showNavBars();
    }

    private initChatHub() {        
        if (this._chatHubService.connection.state === "Disconnected") this._chatHubService.start();

        this._chatHubService.connection.on("ReceiveMessage", (message) => {
            console.log(message)
        });
    }

    private getJoinedServers() {
        try {
            this._serverService.fetchServersJoined()
            .subscribe({
                next: (response) => {
                    this.serversJoined.set(response);
                },
                error: (error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        this._router.navigateByUrl("/login");
                    }
                    else {
                        console.log(error);
                    }
                }
            });
        }
        catch(err) {
            console.log(err);
        }
    }
    
    loadServer(serverName: string) {
        if (serverName !== 'home') {
            try {
                this._serverService.fetchServer(serverName)
                .subscribe({
                    next: (response) => {
                        this.serverData.set(response);
                    },
                    error: (error: HttpErrorResponse) => {
                        console.log(error);
                    }
                });
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    collapseSidebar(collapseState: boolean) {
        if (collapseState) {
            this.appStore.collapseChatSidebar();
        }
        else {
            this.appStore.expandChatSidebar();
        }
    }
}
