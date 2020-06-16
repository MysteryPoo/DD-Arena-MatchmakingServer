
import { ISocket } from "./ISocket";

export interface IMessageHandler {

    readonly messageId : number;
    handle(data : string, mySocket : ISocket) : boolean;
    
}
