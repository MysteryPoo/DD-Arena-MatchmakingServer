
import { MessageBase } from "../../../Abstracts/MessageBase";

export class SetVisibleUsername extends MessageBase {

    public username! : string;

    serialize(): string {
        // TODO : Implement this with an error code for the client to process
        throw new Error("Method not implemented.");
    }
    
    deserialize(data: string): void {
        try {
            let message : any = JSON.parse(data);

            this.username = message.username;

            this.valid = true;
        } catch (e) {
            this.valid = false;
        }
    }

}
