
import { MessageBase } from "../../../Abstracts/MessageBase";

export class GetNextAward extends MessageBase {

    credits! : number;
    premium! : number;
    experience! : number;
    avatarId! : string;
    avatarUri! : string;

    serialize(): string {
        return JSON.stringify({
            messageId : this.messageId,
            "credits" : this.credits,
            "premium" : this.premium,
            "experience" : this.experience,
            "avatarId" : this.avatarId,
            "avatarUri" : this.avatarUri
        });
    }

    deserialize(data: string): void {
        throw new Error("Method not implemented.");
    }

}
