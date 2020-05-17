
import { MessageBase } from "../../Abstracts/MessageBase";
import { BufferHelper } from "../../BufferHelper";

export class Ping extends MessageBase {

    public time! : bigint;

    serialize(): Buffer {
        let bufferSize : number = 13;
        let helper : BufferHelper = new BufferHelper(Buffer.allocUnsafe(bufferSize));
        
        helper.writeUInt8(this.messageId);
        helper.writeUInt32LE(bufferSize);
        helper.writeBigUInt64LE(this.time);

        return helper.buffer;
    }

    deserialize(buffer: Buffer): void {
        try {
            this.validate(buffer, 8);

            let helper : BufferHelper = new BufferHelper(buffer);

            this.time = helper.readBigUInt64LE();

            this.valid = true;
        } catch (e) {
            console.error(e);
            this.valid = false;
        }
    }

}
