
import { MessageBase } from "../../../Abstracts/MessageBase";

export class NewLobby extends MessageBase {

    public isPublic! : boolean;
    public maxPlayers! : number;

    serialize(): string {
        throw new Error("Method not implemented.");
    }

    deserialize(data: string): void {
        try {
            let message : any = JSON.parse(data);

            this.isPublic = message.isPublic;
            this.maxPlayers = message.maxPlayers;

            this.valid = true;
        } catch (e) {
            this.valid = false;
        }
    }

}
