
export interface IMessageBase {

    valid : boolean;
    serialize() : string;
    deserialize(data : string) : void;
    
}
