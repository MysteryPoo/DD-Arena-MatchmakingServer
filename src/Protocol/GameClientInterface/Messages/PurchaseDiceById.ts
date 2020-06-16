
import { MessageBase } from "../../../Abstracts/MessageBase";
import { BufferHelper } from "../../../BufferHelper";

export class PurchaseDiceById extends MessageBase {

    public message! : string;
    public id! : string;

    public serialize() : string {
        throw("");
        let messageLength : number = Buffer.byteLength(this.message, 'utf8');
        let bufferSize : number = 6 + messageLength;

        let helper : BufferHelper = new BufferHelper(Buffer.allocUnsafe(bufferSize));
        helper.writeUInt8(this.messageId);
        helper.writeUInt32LE(bufferSize);
        helper.writeUInt8(messageLength);
        helper.writeString(this.message);

    }

    public deserialize(data : string) : void {
        // try {
        //     let helper : BufferHelper = new BufferHelper(buffer);

        //     let idLength : number = helper.readUInt8();

        //     const bufferSize = 1 + idLength;

        //     this.validate(buffer, bufferSize);

        //     this.id = helper.readString(idLength);

        //     this.valid = true;
        // } catch (e) {
        //     console.error(e);
        //     this.valid = false;
        // }
    }
}
