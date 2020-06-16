
import { IMessageBase } from "../Interfaces/IMessageBase";

export abstract class MessageBase implements IMessageBase {
    
    valid: boolean = false;

    constructor(protected messageId : number, data? : string) {
        if (data) {
            this.deserialize(data);
        }
    }

    abstract serialize(): string;

    abstract deserialize(data: string): void;

    public validate(buffer : Buffer, expectedSize : number) : void {
        if(buffer.length != expectedSize) {
            throw `Incorrect buffer size. Expected ${expectedSize}, but got ${buffer.length}`;
        }
    }
    
}
