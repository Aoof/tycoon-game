import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import Database from './db.js';
import dotenv from 'dotenv';

import { handler } from '../build/handler.js';
import authRouter from './routes/auth.js';

dotenv.config({
    path: './.env',
    quiet: true
});

const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app);

// const io = new Server(server);

const sessionOptions = session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI, dbName: process.env.DBNAME }),
});

app.use(sessionOptions);

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(':method :url :status :res[content-length] bytes - :response-time ms'));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
	next();
});

app.use('/auth', authRouter);

app.post("/lobby", (req, res) => {
  const { lobbyId, token } = req.body;
  res.status(501).json({ message: "Lobby not created (not yet implemented)", lobbyId, token });
});

app.use(handler);

const db = new Database();

server.listen(port, () => {
    console.log(`Server is running on port ${process.env.HOST}:${port}`);
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
