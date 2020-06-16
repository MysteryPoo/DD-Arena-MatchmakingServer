
import { MessageBase } from "../../../Abstracts/MessageBase";

export class Handshake extends MessageBase {

    public id! : string;
    public device_uuid! : string;
    public username! : string;
    public password! : string;
    public salt! : string;
    public lastLogin! : Date;
    public operatingSystem! : string;
    public protocolVersion! : number;
    public gameVersion! : number;

    serialize() : string {
        let response = JSON.stringify({
            messageId : this.messageId,
            id : this.id,
            device_uuid : this.device_uuid,
            username : this.username,
            lastLogin : this.lastLogin
        });
        
        return response;
    }

    deserialize(data : string) : void {
        try {
            let message : any = JSON.parse(data);
            this.id = message.id;
            this.device_uuid = message.device_uuid;
            this.password = message.password;
            this.protocolVersion = message.version;
            this.valid = true;
        } catch (e) {
            
        }
    }
}
