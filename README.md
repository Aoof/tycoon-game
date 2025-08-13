# Tycoon Game - aoof

Inspired by the Persona 5 Tycoon playing cards game I decided to create a website similar to many other playing cards websites, however what makes it different is that this specific game and ruleset seemed to be exclusive to Persona 5, so my project will bring that experience into a modern UI/UX and allow users to play against each other (as opposed to the original only vs AI in P5). Eventually I'd like to create AI bots to play against the players, but first I must create a reliable game following a clean and efficient codebase.

Using svelte for the frontend and creating an aesthetically appealing game interface, and express.js alongside node to create the authentication system and lay down a solid infrastucture for this project to make it production-ready, and WebSockets to allow seamless interactivity between players I will create a comfortable and intuitive environment that everyone can enjoy.

## Workflow thoughts

The main website is gonna include an http server that handles authentication, and offloads into a database what is not being used.

What I imagine the website's frontend is gonna look like is; you enter and there is a landing page, you can see brief details about active users and ongoing games.

User is not gonna be able to join a lobby without signing in but will be able to see them.

Once a player joins a lobby they connect to the lobby's WebSocket and can start sending and receiving messages.

## Server Backend Logic

### Server messages

- `userJoined`: Sends `client` details to all other `clients`
- `userLeft`: Lets everyone know that a specific `client` has left the lobby
- `chatMessage`: Lets everyone that a new `message` arrived and includes the `message` content
- `gameStateUpdate`: Send the current state of the game in json format
- `gameEnd`: Notifies all clients that the game ended alongside the results of the game (will store stats from the game into a database for each player)

### Client messages

- `sendChat`: Sends a chat message to the lobby
- `joinLobby`: If a `client` enters a lobby they need to check if there is existing data for them so they can resume if they left abruptly
- `leaveLobby`: Requests to leave the current lobby
- `sendAction`: Sends a game action to the server that the player decides
