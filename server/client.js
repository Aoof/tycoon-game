import { db } from './db.js';
import bcrypt from 'bcrypt';

class Client {
	constructor(socket) {
		this.socket = socket;
		this.id = socket.id;
        this.loggedIn = false;
        this.username = null;
        this.avatar = null;

		socket.on('eventFromClient', (data) => {
			this.handleEventFromClient(data);
		});
	}

    handleEventFromClient(data) {
        switch (data.type) {
            case 'login':
                this.handleLogin(data);
                break;
            case 'message':
                this.handleMessage(data);
                break;
        }
    }

    handleLogin(data) {
        let pw = data.hashedPassword;
        this.username = data.username;
        this.avatar = data.avatar;

        db.collection('users').findOne({ username: this.username })
            .then(user => {
                if (user) {
                    bcrypt.compare(pw, user.password, (err, result) => {
                        if (result) {
                            this.socket.emit('loginSuccess', { user });
                            this.loggedIn = true;
                        } else {
                            this.socket.emit('loginFailure', { message: 'Invalid credentials' });
                            this.loggedIn = false;
                        }
                    });
                } else {
                    this.socket.emit('loginFailure', { message: 'User not found' });
                }
            })
            .catch(err => {
                console.error('Error during login:', err);
                this.socket.emit('loginFailure', { message: 'Internal server error' });
            });
    }

    handleMessage(data) {
        // Handle incoming messages
    }
}

export default Client;
