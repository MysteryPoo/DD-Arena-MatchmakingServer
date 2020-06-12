
import { MessageBase } from "../../Abstracts/MessageBase";
import { BufferHelper } from "../../BufferHelper";

export class Ping extends MessageBase {

    public time! : bigint;

    serialize(): string {
        return JSON.stringify({
            messageId : this.messageId,
            "time" : this.time
        });

    }

    deserialize(data: string): void {
        try {
            let message : any = JSON.parse(data);

            this.time = message.time;

            this.valid = true;
        } catch (e) {
            this.valid = false;
        }
    }

}
