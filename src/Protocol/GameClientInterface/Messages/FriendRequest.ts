
import { MessageBase } from "../../../Abstracts/MessageBase";

export class FriendRequest extends MessageBase {

    public id! : string;
    public addFlag! : boolean; // If false, remove

    serialize(): string {
        // TODO : Add a response whether the request was successful or not
        throw new Error("Method not implemented.");
    }

    deserialize(data: string): void {
        try {
            let message : any = JSON.parse(data);

            this.id = message.id;
            this.addFlag = message.addFlag;

            this.valid = true;
        } catch (e) {

        }
    }

}
