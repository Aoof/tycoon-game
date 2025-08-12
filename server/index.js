import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { db } from './db.js';
import dotenv from 'dotenv';

import { handler } from '../build/handler.js';
import path from 'path';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app);

const io = new Server(server);

const sessionOptions = session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
});

app.use(sessionOptions);

app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(':method :url :status :res[content-length] bytes - :response-time ms'));

app.post("/lobby", (req, res) => {
  const { lobbyId, token } = req.body;
  res.status(501).json({ message: "Lobby not created (not yet implemented)", lobbyId, token });
});

app.get("/.well-known/acme-challenge/:token", (req, res) => {
  const { token } = req.params;
  let challenge = path.join(__dirname, '..', 'static', '.well-known', 'acme-challenge', token);
  res.sendFile(challenge);
});

io.on('connection', (socket) => {
	console.log('A user connected:', socket.id);
});

app.use(handler);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.on('close', () => {
    db.disconnect();
});

process.on('SIGINT', () => {
    console.log('Received SIGINT. Closing server...');
    server.close(() => {
        console.log('Server closed.');
        db.disconnect();
        process.exit(0);
    });
});
