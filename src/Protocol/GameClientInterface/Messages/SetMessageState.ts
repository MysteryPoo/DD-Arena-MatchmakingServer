
import { MessageBase } from "../../../Abstracts/MessageBase";
import { BufferHelper } from "../../../BufferHelper";

export class SetMessageState extends MessageBase {

    public id! : string;
    public setRead! : boolean;
    public setArchive! : boolean;

    serialize(): string {
        throw new Error("Method not implemented.");
    }

    deserialize(data: string): void {
        // try {
        //     let helper : BufferHelper = new BufferHelper(data);

        //     let idLength : number = helper.readUInt8();

        //     this.validate(data, 3 + idLength);

        //     // TODO : Cram these two flags into a single 8-bit
        //     this.id = helper.readString(idLength);
        //     this.setRead = helper.readUInt8() === 0 ? false : true;
        //     this.setArchive = helper.readUInt8() === 0 ? false : true;

        //     this.valid = true;
        // } catch (e) {
        //     this.valid = false;
        // }
    }

}
