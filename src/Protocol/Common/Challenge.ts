/// TODO : Rename to AuthenticationChallenge
import { MessageBase } from "../../Abstracts/MessageBase";

export class AuthenticationChallenge extends MessageBase {

    public salt! : string;
    
    serialize(): string {
        return JSON.stringify({
            messageId : this.messageId,
            salt : this.salt
        });
    }

    deserialize(data: string): void {
        throw new Error("Method not implemented.");
    }

}
