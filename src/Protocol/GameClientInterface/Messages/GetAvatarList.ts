
import { MessageBase } from "../../../Abstracts/MessageBase";
import { IAvatar } from "../../../Models/Avatar.model";
import { BufferHelper } from "../../../BufferHelper";

export class GetAvatarList extends MessageBase {

    public ownedAvatarList : Array<IAvatar> = [];
    public unownedAvatarList : Array<IAvatar> = [];

    serialize(): string {
        let ownedList = [];
        let unownedList = [];

        for (let avatar of this.ownedAvatarList) {
            let info = {
                "id" : avatar.id,
                "uri" : avatar.uri
            }
            ownedList.push(info);
        }

        for (let avatar of this.unownedAvatarList) {
            let info = {
                "id" : avatar.id,
                "uri" : avatar.uri,
                "requiredLevel" : avatar.requiredLevel,
                "creditCost" : avatar.creditCost,
                "premiumCost" : avatar.premiumCost
            }
            unownedList.push(info);
        }

        return JSON.stringify({
            messageId : this.messageId,
            "owned" : ownedList,
            "unowned" : unownedList
        });
        
    }

    deserialize(data: string): void {
        throw new Error("Method not implemented.");
    }

}
