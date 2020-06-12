
import { MessageBase } from "../../../Abstracts/MessageBase";
import { IUser } from "../../../Models/User.model";
import { BufferHelper } from "../../../BufferHelper";

export class UserSearch extends MessageBase {

    playerList! : Array<IUser>;
    username! : string;

    serialize(): string {
        throw("");
        let dynamicSize : number = 0;
        for (let player of this.playerList) {
            dynamicSize += Buffer.byteLength(player.id, 'utf-8');
        }

        let bufferSize : number = 6 + this.playerList.length + dynamicSize;

        let helper : BufferHelper = new BufferHelper(Buffer.allocUnsafe(bufferSize));

        helper.writeUInt8(this.messageId);
        helper.writeUInt32LE(bufferSize);
        helper.writeUInt8(this.playerList.length);
        for (let player of this.playerList) {
            let idLength : number = Buffer.byteLength(player.id, 'utf-8');
            helper.writeUInt8(idLength);
            helper.writeString(player.id);
        }

    }
    
    deserialize(data: string): void {
        // try {
        //     let helper : BufferHelper = new BufferHelper(data);

        //     let usernameLength : number = helper.readUInt8();

        //     this.validate(data, 1 + usernameLength);

        //     this.username = helper.readString(usernameLength);

        //     this.valid = true;
        // } catch (e) {
        //     this.valid = false;
        // }
    }

}
