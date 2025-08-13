
let id = 0;

class Lobby {
    constructor() {
        this.id = id++;
        this.clients = [];
    }

    addClient(client) {
        this.clients.push(client);
    }

    removeClient(client) {
        this.clients = this.clients.filter(c => c !== client);
    }
}