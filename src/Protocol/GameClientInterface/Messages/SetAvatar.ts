
import { MessageBase } from "../../../Abstracts/MessageBase";
import { BufferHelper } from "../../../BufferHelper";

export class SetAvatar extends MessageBase {

    public id! : string;

    serialize(): string {
        throw new Error("Method not implemented.");
    }

    deserialize(data: string): void {
        // try {
        //     let helper : BufferHelper = new BufferHelper(buffer);

        //     let idLength : number = helper.readUInt8();

        //     this.validate(buffer, 1 + idLength);

        //     this.id = helper.readString(idLength);

        //     this.valid = true;
        // } catch (e) {
        //     this.valid = false;
        // }
    }

}
