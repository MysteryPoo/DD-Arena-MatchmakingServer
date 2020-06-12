
import { MessageBase } from "../../../Abstracts/MessageBase";
import { BufferHelper } from "../../../BufferHelper";

export class GetFriendList extends MessageBase {

    public id! : string;
    public username! : string;
    public online! : boolean;
    public removeFromClient! : boolean;
    
    serialize(): string {
        return JSON.stringify({
            messageId : this.messageId,
            "id" : this.id,
            "username" : this.username,
            "online" : this.online,
            "removeFromClient" : this.removeFromClient
        });

    }
    deserialize(data: string): void {
        throw new Error("Method not implemented.");
    }

}
