
import { MessageBase } from "../../../Abstracts/MessageBase";

export class GetPublicPlayerInfo extends MessageBase {

    public id! : string;
    public username! : string;
    public avatarUri! : string;
    public diceUri! : string;
    public rank! : number;

    serialize(): string {
        return JSON.stringify({
            messageId : this.messageId,
            "id" : this.id,
            "username" : this.username,
            "avatarUri" : this.avatarUri,
            "diceUri" : this.diceUri,
            "rank" : this.rank
        });

    }
    deserialize(data: string): void {
        try {
            let message : any = JSON.parse(data);
            this.id = message.id;

            this.valid = true;
        } catch(e) {
            this.valid = false;
        }
    }
    
}
