
import { MessageBase } from "../../../Abstracts/MessageBase";

export class StartGame extends MessageBase {

    ip! : string;
    port! : number;
    token! : number;

    serialize(): string {
        return JSON.stringify({
            messageId : this.messageId,
            "ip" : this.ip,
            "port" : this.port,
            "token" : this.token
        });
    }

    deserialize(data: string): void {
        throw new Error("Method not implemented.");
    }

}
