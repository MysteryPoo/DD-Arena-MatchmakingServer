
import { MessageBase } from "../../../Abstracts/MessageBase";

export class UpdateLobbyData extends MessageBase {

    public numClients! : number;
    public maxClients! : number;
    public isPublic! : boolean;

    serialize(): string {
        return JSON.stringify({
            messageId : this.messageId,
            "numClients" : this.numClients,
            "maxClients" : this.maxClients,
            "isPublic" : this.isPublic
        });
    }

    deserialize(data: string): void {
        try {
            let message : any = JSON.parse(data);

            this.isPublic = message.isPublic;
            this.maxClients = message.maxClients;

            this.valid = true;
        } catch (e) {
            this.valid = false;
        }
    }
    
}
