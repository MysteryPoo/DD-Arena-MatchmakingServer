
import { config } from "dotenv";
import { UserServerManager } from "./UserServerManager";
import { GameServerServer } from "./GameServerServer";
import mongoose from "mongoose";
import { LobbyManager } from "./LobbyManager";
import { DatabaseUtility } from "./DatabaseUtility";
import { ContainerManager } from "./ContainerManager";

config();

const gameClientPort : number = process.env.PORT ? Number(process.env.PORT) : 40000;
const gameServerPort : number = process.env.GSPORT ? Number(process.env.GSPORT) : 40001;

mongoose.connect('mongodb://' + process.env.MONGODB + ':27017/' + process.env.DB, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Mongo DB connected!");
    DatabaseUtility.fillAvatars();
});

// TODO : All this hostname/port stuff needs to get refactored to support multiple docker hosts
const hostname : string = process.env.MMSIP ? process.env.MMSIP : "localhost";
const serverPoolSize : number = process.env.SERVERPOOLSIZE ? Number(process.env.SERVERPOOLSIZE) : 5;
const serverPortFirst : number = process.env.SERVERPORTFIRST ? Number(process.env.SERVERPORTFIRST) : 40002;

const containerManager : ContainerManager = new ContainerManager(hostname, gameServerPort, serverPoolSize, serverPortFirst);
const lobbyManager : LobbyManager = new LobbyManager(containerManager, hostname);

const server : UserServerManager = new UserServerManager(lobbyManager);
server.start(gameClientPort);

const gameServerManager : GameServerServer = new GameServerServer(lobbyManager);
gameServerManager.start(gameServerPort);
