
import { MessageBase } from "../../../Abstracts/MessageBase";

export class LobbyPlayer extends MessageBase {

    public clientListIndex! : number;
    public id! : string;
    public isReady! : boolean;
    public requestingToLeaveLobby! : boolean;

    serialize(): string {
        return JSON.stringify({
            messageId : this.messageId,
            "clientListIndex" : this.clientListIndex,
            "id" : this.id,
            "isReady" : this.isReady
        });
        
    }

    deserialize(data: string): void {
        try {
            let message : any = JSON.parse(data);

            this.isReady = message.isReady;
            this.requestingToLeaveLobby = message.requestingToLeaveLobby;

            this.valid = true;
        } catch (e) {
            this.valid = false;
        }
    }
    
}
