
import { Socket, SocketConnectOpts } from "net";
import { v4 as uuid } from "uuid";
import { IClient } from "../Interfaces/IClient";
import { IMessageHandler } from "../Interfaces/IMessageHandler";
import { IConnectionManager } from "../Interfaces/IConnectionManager";

class Header {
    constructor(public messageId : number, public messageSize : number) {}
}

class Packet {
    constructor(public header : Header, public data : Buffer) {}

    get isValid() : boolean {
        return this.header.messageSize - 5 === this.data.length;
    }
}

export abstract class ClientBase implements IClient {

    public uid : string = uuid();
    public authenticated : boolean = false;
    public isConnected : boolean = false;
    public lastConnectionError : Error = new Error();

    constructor(
        private socket : Socket,
        protected handlerList : IMessageHandler[],
        readonly connectionManager : IConnectionManager,
        connectionOptions? : SocketConnectOpts,
        onConnectCallback? : () => void
        ) {

        if (connectionOptions) {
            socket.connect(connectionOptions, onConnectCallback);
        }

        this.socket.on('data', (data : string) => {
            try {
                let index : number = data.indexOf("{");
                data = data.toString().substring(index);
                let message : any = JSON.parse(data);
                if (this.ValidateMessageId(message.messageId)) {
                    this.handlerList[message.messageId].handle(data, this);
                } else {
                    console.error(`Unknown messageType: ${message.messageId}`);
                }
            } catch(e) {
                console.debug(`Failed to parse the following data: ${data}`);
            }
        })
        .on('error', (err : Error) => {
            console.error(err);
            this.lastConnectionError = err;
        })
        .on('close', (had_error) => {
            if (had_error) {
                console.error("Unknown error ocurred when client disconnected.");
            } else {
                console.debug(`Console: Socket has closed.`);
            }
            this.isConnected = false;
            this.connectionManager.handleDisconnect(this);
        });
    }

    abstract ValidateMessageId(identifier : number): boolean;

    abstract GetMessageTypeString(identifier : number) : string;

    public write(data : string) : boolean {
        this.isConnected = this.socket.write(data);
        return this.isConnected;
    }

    public destroy() : void {
        this.socket.destroy();
        this.socket.unref();
    }

    private parseMessage(buffer : Buffer, tell : number) : Packet {
        let header : Header = this.extractHeader(buffer, tell);
        let messageData : Buffer = buffer.slice(tell + 5, tell + header.messageSize);

        return new Packet(header, messageData);
    }

    private extractHeader(buffer : Buffer, tell : number) : Header {
        let rawIdentifier : number = buffer.readUInt8(tell);
        let messageSize : number = buffer.readUInt32LE(tell + 1);

        return new Header(rawIdentifier, messageSize);
    }

}
