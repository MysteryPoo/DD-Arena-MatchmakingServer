
import http from "http";
import { ILobby } from "./Interfaces/ILobby";

export class ContainerManager {

    constructor(private matchmakingServerIp : string = "dda.dragonringstudio.com", private matchmakingServerPort : number = 40001) {}

    public requestGameServerContainer(lobby : ILobby) : Promise<number> {
        // TODO : First check to see if this docker host is already hosting an allotment of game servers
        // Figure out which docker host to use once we support more than one.
        return this.createContainer(lobby);
    }

    private async createContainer(lobby : ILobby) : Promise<number> {
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
                    "PortBindings" : {
                        "9000/tcp" : [
                            {
                                "HostIp" : "0.0.0.0",
                                "HostPort" : "40002-40008"
                            }
                        ]
                    },
                    "PublishAllPorts": true
                }
            });
    
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

}
