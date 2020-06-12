
import { MessageBase } from "../../../Abstracts/MessageBase";
import { IDice } from "../../../Models/Dice.model";
import { BufferHelper } from "../../../BufferHelper";

export class GetDiceList extends MessageBase {

    public ownedDiceList : Array<IDice> = [];
    public unownedDiceList : Array<IDice> = [];

    serialize(): string {
        let ownedList = [];
        let unownedList = [];

        for (let avatar of this.ownedDiceList) {
            let info = {
                "id" : avatar.id,
                "uri" : avatar.uri
            }
            ownedList.push(info);
        }

        for (let avatar of this.unownedDiceList) {
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
