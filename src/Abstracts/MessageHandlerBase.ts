
import { IMessageHandler } from "../Interfaces/IMessageHandler";
import { ISocket } from "../Interfaces/ISocket";

export abstract class MessageHandlerBase implements IMessageHandler {

    constructor(public messageId: number) {

    }

    abstract handle(data : string, mySocket : ISocket) : boolean;
    
}
