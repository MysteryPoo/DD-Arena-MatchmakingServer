
import { MessageBase } from "../../../Abstracts/MessageBase";

export class GetDashboard extends MessageBase {

    public onlinePlayers! : number;
    public lookingPlayers! : number;
    public level! : number;
    public credits! : number;
    public rares! : number;
    public conquest! : number;
    public pendingReports! : boolean;
    public pendingAwards! : boolean;

    serialize(): string {
        let flags : number = 0;
        if (this.pendingReports) {
            flags |= 0b10;
        }
        if (this.pendingAwards) {
            flags |= 0b01;
        }
        return JSON.stringify({
            messageId : this.messageId,
            "onlinePlayers" : this.onlinePlayers,
            "lookingPlayers" : this.lookingPlayers,
            "level" : this.level,
            "credits" : this.credits,
            "rares" : this.rares,
            "conquest" : this.conquest,
            "flags" : flags
        });
        
    }

    deserialize(data: string): void {
        throw new Error("Method not implemented.");
    }
    
}
