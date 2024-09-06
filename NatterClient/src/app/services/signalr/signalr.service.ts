import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr"
import { chathubUrl } from "../../helpers/scripts/apiUrls";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class ChatHubService {
    connection: HubConnection;

    constructor() {
        this.connection = new HubConnectionBuilder()
            .withUrl(chathubUrl)
            .configureLogging(LogLevel.Information)
            .build();

        this.connection.onclose(async () => {
            await this.start();
        });
    }

    async start() {
        try {
          await this.connection.start();
          console.log("SignalR Connected.");
        }
        catch (err) {
          console.log(err);
          setTimeout(this.start, 5000);
        }
    }
}