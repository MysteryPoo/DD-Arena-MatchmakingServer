
import { MessageHandlerBase } from "../../Abstracts/MessageHandlerBase";
import { ISocket } from "../../Interfaces/ISocket";
import { Ping } from "./Ping";

export class PingHandler extends MessageHandlerBase {

    handle(data: string, mySocket: ISocket): boolean {
        let message: Ping = new Ping(this.messageId, data);
        
        if (message.valid) {
            return mySocket.write(message.serialize());
        }
        else {
            return false;
        }
    }

}
