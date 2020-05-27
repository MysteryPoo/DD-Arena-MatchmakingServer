
import { MessageBase } from "../../../Abstracts/MessageBase";
import { BufferHelper } from "../../../BufferHelper";

export class Handshake extends MessageBase {

    public gameVersion!: number;
    public gameServerPassword!: string;
    public playerIdList!: Array<string>;
    public playerTokenList!: Array<number>;

    serialize(): Buffer {
        if (this.playerIdList.length !== this.playerTokenList.length) {
            console.debug(`playerIdList.length = ${this.playerIdList.length}`);
            console.debug(`playerTokenList.length = ${this.playerTokenList.length}`);
            throw new Error("Array sizes must match.");
        }
        let staticBufferSize : number = 6 + 2 * this.playerTokenList.length + this.playerIdList.length;
        let idListLength : number = 0;
        for (let id of this.playerIdList) {
            idListLength += Buffer.byteLength(id, 'utf-8');
        }
        let bufferSize : number = staticBufferSize + idListLength;
        let helper : BufferHelper = new BufferHelper(Buffer.allocUnsafe(bufferSize));

        helper.writeUInt8(this.messageId);
        helper.writeUInt32LE(bufferSize);
        helper.writeUInt8(this.playerIdList.length);
        for (let id of this.playerIdList) {
            helper.writeUInt8(Buffer.byteLength(id, 'utf-8'));
            helper.writeString(id);
        }
        for (let token of this.playerTokenList) {
            helper.writeUInt16LE(token);
        }

        return helper.buffer;
    }

    deserialize(buffer: Buffer): void {
        try {
            let helper : BufferHelper = new BufferHelper(buffer);
            this.gameVersion = helper.readUInt8();
            
            let passLength : number = helper.readUInt8();
            this.gameServerPassword = helper.readString(passLength);

            let numPlayers : number = helper.readUInt8();
            if (this.playerIdList === undefined) {
                this.playerIdList = [];
            }
            for (let p = 0; p < numPlayers; ++p) {
                let idLength : number = helper.readUInt8();
                this.playerIdList.push(helper.readString(idLength));
            }

            this.valid = true;
        } catch (e) {
            console.error(e);
            this.valid = false;
        }
    }

}
