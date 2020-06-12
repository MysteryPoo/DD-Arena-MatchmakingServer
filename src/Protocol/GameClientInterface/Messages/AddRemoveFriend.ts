
import { MessageBase } from "../../../Abstracts/MessageBase";

export class AddRemoveFriend extends MessageBase {

    public id! : string;
    public username! : string;
    public online! : boolean;
    public remove! : boolean;
    
    serialize(): string {
        let flags : number = 0;
        flags |= this.online ? 0b01 : 0b00;
        flags |= this.remove ? 0b10 : 0b00;

        return JSON.stringify({
            cmd : this.messageId,
            id : this.id,
            username : this.username,
            flags : flags
        });
    }

    deserialize(data: string): void {
        try {
            let message : any = JSON.parse(data);

            this.id = message.id;
            
            let flags : number = message.flags;
            this.remove = flags & 0b1 ? true : false;

            this.valid = true;
        } catch (e) {

        }
    }

}
