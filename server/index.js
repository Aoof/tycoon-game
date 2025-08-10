import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { handler } from '../build/handler.js';

const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app);

const io = new Server(server);

let users = [];

io.on('connection', (socket) => {
	console.log('A user connected:', socket.id);
    users.push(socket);

	socket.on('disconnect', () => {
		console.log('User disconnected:', socket.id);
		users = users.filter((user) => user !== socket);
	});

    socket.on('eventFromClient', (data) => {
        console.log('Message from client:', data);
        data = { ...data, timestamp: Date.now(), userId: socket.id };
        io.emit('eventFromServer', data);
    });
});

app.use(handler)
server.listen(port)