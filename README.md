# authentication-server
Supposed to be a generic authentication server for dragon ring games.

Designed to be ran inside of a Docker container. Any other use is not supported and modifications would likely be necessary.

Ensure there is a mongodb container running on the same host attached to a network called 'mongo_network' and run the following to start the server:

docker run --rm -it --network mongo_network -v //var/run/docker.sock:/var/run/docker.sock -p 40000-40001:9000-9001 --name ddamms --env-file .env victordavion/ddamms:latest

Environment Variables:
(Place these in a .env file for easy runtime injection)

PORT=9000
GSPORT=9001
MONGODB=some-mongo
DB=test
DEBUG=0
