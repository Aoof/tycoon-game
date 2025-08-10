class Lobby {
    constructor(id) {
        this.id = id;
        this.clients = new Map();
    }

    addClient(client) {
        this.clients.set(client.id, client);
    }

    removeClient(client) {
        this.clients.delete(client.id);
    }

    broadcastMessage(message) {
        for (const client of this.clients.values()) {
            client.socket.emit('message', message);
        }
    }

    updateServerState() {
        for (const client of this.clients.values()) {
            client.socket.emit('update', this.getStateForClient(client));
        }
    }
}

class LobbiesManager {
    constructor() {
        this.clients = new Map();
        this.lobbies = new Map();

        this.lobbyIdCounter = 0;
        this.maxClientsPerLobby = 4;
    }

    addClient(client) {
        this.clients.set(client.id, client);
        this._addClientToLobby(client);
    }

    _addClientToLobby(client) {
        for (const lobby of this.lobbies.values()) {
            if (lobby.clients.size < this.maxClientsPerLobby) {
                lobby.addClient(client);
                return;
            }
        }

        const newLobby = new Lobby(this.lobbyIdCounter++);
        newLobby.addClient(client);
        this.lobbies.set(newLobby.id, newLobby);
    }
}

export default LobbiesManager;
