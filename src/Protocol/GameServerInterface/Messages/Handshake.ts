
import { MessageBase } from "../../../Abstracts/MessageBase";

export class Handshake extends MessageBase {

    public gameVersion!: number;
    public gameServerPassword!: string;
    public playerIdList!: Array<string>;
    public playerTokenList!: Array<number>;

    serialize(): string {
        return JSON.stringify({
            messageId : this.messageId,
            playerIdList : this.playerIdList,
            playerTokenList : this.playerTokenList
        });
    }

    deserialize(data: string): void {
        try {
            let message : any = JSON.parse(data);

            this.gameVersion = message.gameVersion;
            this.gameServerPassword = message.gameServerPassword;
            this.playerIdList = message.playerIdList;

            this.valid = true;
        } catch (e) {
            this.valid = false;
        }
    }

}
