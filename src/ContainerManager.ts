
import http from "http";
import { ILobby } from "./Interfaces/ILobby";

export class ContainerManager {

    private containerMap : Map<number, any> = new Map();

    constructor(private matchmakingServerIp : string = "dda.dragonringstudio.com", private matchmakingServerPort : number = 40001,
                private serverPoolSize : number, private serverPortStart : number) {}

    public async requestGameServerContainer(lobby : ILobby) : Promise<number> {
        return new Promise<number>(async (resolve, reject) => {
            await this.UpdateServerPool();
            let port : number = this.getFreeServerSlot();
            if (port !== -1) {
                resolve(this.createContainer(lobby, port));
            } else {
                reject("No servers available.");
            }
        });
    }

    private async createContainer(lobby : ILobby, port : number) : Promise<number> {
        return new Promise<number>( (resolve, reject) => {
            let postData = JSON.stringify({
                "Image": "victordavion/ddags:latest",
                "Env" : [
                    `AUTHIP=${this.matchmakingServerIp}`,
                    `AUTHPORT=${this.matchmakingServerPort}`,
                    `PORT=9000`,
                    `HOST=${lobby.clientList[0].uid}`,
                    `PASSWORD=${lobby.gameServerPassword}`,
                    `TOKEN=1234`,
                    `PLAYERCOUNT=${lobby.maxPlayers}`,
                    `BOTCOUNT=${lobby.getBotCount()}`,
                    `NOMATCHMAKING=0`
                ],
                "HostConfig" : {
                    "AutoRemove" : true,
                    "NetworkMode": "mongo_network",
                    "PortBindings" : {
                        "9000/tcp" : [
                            {
                                "HostIp" : "0.0.0.0",
                                "HostPort" : `${port}`
                            }
                        ],
                        "9000/udp" : [
                            {
                                "HostIp" : "0.0.0.0",
                                "HostPort" : `${port}`
                            }
                        ]
                    },
                    "PublishAllPorts": false
                }
            });
            console.debug(postData);
    
            let options = {
                socketPath: '/var/run/docker.sock',
                path: '/containers/create',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': postData.length
                }
            }
    
            const request = http.request(options, (response) => {
                let data = "";
                response.setEncoding('utf8');
                response.on('data', chunk => {
                    data += chunk;
                });
                response.on('error', err => {
                    console.error(err);
                    reject(err);
                });
                response.on('end', () => {
                    let containerId = JSON.parse(data).Id;
                    console.debug(`GameServer container created with id: ${containerId}`)
                    resolve(this.startContainer(containerId));
                });
            });
    
            request.write(postData);
            request.end();
        });
    }

    private async startContainer(containerId : string) : Promise<number> {
        return new Promise<number>( (resolve, reject) => {
            let options = {
                socketPath: '/var/run/docker.sock',
                path: `/containers/${containerId}/start`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': 0
                }
            }
    
            const request = http.request(options, (response) => {
                let data = "";
                response.setEncoding('utf8');
                response.on('data', chunk => {
                    data += chunk;
                });
                response.on('error', err => {
                    console.error(err);
                    reject(err);
                });
                response.on('end', () => {
                    console.debug(`GameServer ${containerId} started...`);
                    resolve(this.getContainerPort(containerId));
                });
            });
    
            request.end();
        });
    }

    private async getContainerPort(containerId : string) : Promise<number> {
        return new Promise<number>( (resolve, reject) => {
            let options = {
                socketPath: '/var/run/docker.sock',
                path: `/containers/${containerId}/json`,
                method: 'GET'
            }
    
            const request = http.request(options, (response) => {
                let data = "";
                response.setEncoding('utf8');
                response.on('data', chunk => {
                    data += chunk;
                });
                response.on('error', err => {
                    console.error(err);
                    reject(err);
                });
                response.on('end', () => {
                    let port = JSON.parse(data).NetworkSettings.Ports["9000/tcp"][0].HostPort;
                    console.debug(`GameServer ${containerId} listening on port ${port}`);
                    resolve(port);
                });
            });
    
            request.end();
        });
    }

    private async UpdateServerPool() : Promise<void> {
        this.containerMap = new Map();
        // TODO : Refactor to use the built in filter parameter
        return new Promise<void>( (resolve, reject) => {
            let options = {
                socketPath: '/var/run/docker.sock',
                path: `/containers/json`,
                method: 'GET'
            }
    
            const request = http.request(options, (response) => {
                let data = "";
                response.setEncoding('utf8');
                response.on('data', chunk => {
                    data += chunk;
                });
                response.on('error', err => {
                    console.error(err);
                    reject(err);
                });
                response.on('end', () => {
                    console.debug(data);
                    let containerList : Array<any> = JSON.parse(data);
                    for (let container of containerList) {
                        if (container.Image === "victordavion/ddags:latest") {
                            let port = container.Ports[0].PublicPort;
                            this.containerMap.set(port, container);
                        }
                    }
                    resolve();
                });
            });
    
            request.end();
        });
    }

    private getFreeServerSlot() : number {
        for (let port : number = this.serverPortStart; port < this.serverPortStart + this.serverPoolSize; ++port) {
            let container : any = this.containerMap.get(port);
            if (undefined === container) {
                return port;
            }
        }
        return -1;
    }

}
