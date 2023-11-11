import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { chathubUrl } from "@/assets/contents/apiUrls.js";

class chatHub {
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
    } catch (err) {
      console.log(err);
      setTimeout(start, 5000);
    }
  }
}

export default new chatHub();
