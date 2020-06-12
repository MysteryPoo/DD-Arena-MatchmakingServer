
export interface ISocket {
    write(data : string) : boolean;
    destroy() : void;
}
