# Dungeons and Dwarves : Arena -- Matchmaking Server
Based on the authentication-server, but specific to DDA. This application provides the central endpoint for Dungeons and Dwarves : Arena clients.
It supports Account/Profile management, Lobby management, and basic Matchmaking.

## Account/Profile management
Accounts are created automatically the first time a client connects and the client must provide a unique Username to be displayed to other clients.
The profile consists of:
* Friends List
* Message/Notification System
* Profile avatar
* In-game custom skins
* Currency
* Level/Rank system

### Store
The store is essentially a list of available unlockables that can be acquired through gifting, level advancement, currency, or any combination thereof.
Generally, avatars are the most common.

# Running
Designed to be ran inside of a Docker container. Any other use is not supported and modifications would likely be necessary.

## Dependencies
* MongoDB Server (Recommended to use Docker as well)
    * docker run --name some-mongo -d mongo:latest
* Docker Host with API reachable from this server (Required for Game Server spawning) Code changes required to support if ran outside of docker.

## With Docker
Right now the Game Server spawning is entirely driven with Docker and it's currently assumed the Game Servers will spawn on the same host as this server. Future work will
allow this to be separated and support more than one Docker Host to be used.

The below example assumes there is a MongoDB container attached to the 'mongo_network' network. All appropriate ENV variables are defined in '.env' and we're exposing the
ports 40000 and 40001 to the Internet for clients to connect to.

To run until exited
docker run --rm -it --network mongo_network -v //var/run/docker.sock:/var/run/docker.sock -p 40000-40001:9000-9001 --name ddamms --env-file .env victordavion/ddamms:latest

To run as a daemon and restart automatically (Production)
docker run -d --restart unless-stopped --network mongo_network -v //var/run/docker.sock:/var/run/docker.sock -p 40000-40001:9000-9001 --name ddamms --env-file .env victordavion/ddamms:latest

## Without Docker
This server application itself can be ran outside of docker using the following steps:
* Install NodeJS
* Run 'npm install' in the project directory
* Create a '.env' file with the appropriate ENV variable values
* 'npm run build'
* 'npm start'

The MONGODB ENV should be set to the hostname/IP of the mongo server; whether it is in a docker container or not.

## Environment Variables
(Place these in a .env file for easy runtime injection)
| Variable Name | Usage | Expected Values |
| --- | --- | --- |
| PORT | The port to listen for clients on. Useful if hosting outside of Docker | A number 1-65535 |
| GSPORT | The port to listen for Game Servers on. | A number 1-65535 |
| MONGODB | The hostname/IP of a MongoDB server. | A hostname/IP |
| DB | The database name according to Mongo | A string |
| MMSIP | The external hostname/IP of THIS server | A hostname/IP |
| SERVERPOOLSIZE | The number of Game Servers this host will support | A number |
| SERVERPORTFIRST | The beginning port for game servers to be hosted on. | A number 1-65535 |

Note: It's planned to deprecate the MMSIP when there's a better way to implant this data at runtime discovered.

Latest build can be found here:
https://hub.docker.com/repository/docker/victordavion/ddamms
