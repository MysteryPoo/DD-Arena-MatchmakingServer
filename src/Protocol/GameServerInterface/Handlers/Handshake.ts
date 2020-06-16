
import { MessageHandlerBase } from "../../../Abstracts/MessageHandlerBase";
import { IClient } from "../../../Interfaces/IClient";
import { Handshake } from "../../GameServerInterface/Messages/Handshake";
import { STATE as gsState, IGameServer } from "../../../Interfaces/IGameServer";
import { GameServerServer } from "../../../GameServerServer";
import { ILobby } from "../../../Interfaces/ILobby";

export class HandshakeHandler extends MessageHandlerBase {

    handle(data: string, myClient: IGameServer): boolean {
        let message : Handshake = new Handshake(this.messageId, data);
        let disconnect : boolean = false;

        if (message.valid) {
            let gameServerServer : GameServerServer = myClient.connectionManager as GameServerServer;
            myClient.state = gsState.Ready;
            myClient.authenticated = true;
            
            // Find the lobby with provided player ID
            let lobby : ILobby | undefined = gameServerServer.lobbyMgr.getLobbyOfClientId(message.playerIdList[0]);
            if (lobby && message.gameServerPassword === lobby.gameServerPassword) {
                let response : Handshake = new Handshake(this.messageId);
                response.playerIdList = this.playerIdListFromLobby(lobby);
                response.playerTokenList = lobby.tokenList;
                myClient.write(response.serialize());
                
                lobby.gameServer = myClient;
                lobby.start();
                console.debug("Game server connected and is good to go.");
            } else {
                console.debug("Game server provided incorrect password");
                disconnect = true;
            }
        } else {
            console.debug("Gameserver provided invalid Handshake message");
            disconnect = true;
        }

        if (disconnect) {
            //this.serverRef.removeClient(myClient);
            myClient.destroy();
            return false;
        }

        return true;
    }

    private playerIdListFromLobby(lobby : ILobby) : Array<string> {
        let playerIdList : Array<string> = [];
        for (let client of lobby.clientList) {
            playerIdList.push(client.uid);
        }
        return playerIdList;
    }

}
