import Database from "../db.js";
import bcrypt from "bcrypt";
import validator from "validator";

export default class User {
    constructor(data) {
        this.data = data;
        this.errors = [];

        this.database = new Database();
        this.usersCollection = this.database.db.collection('users');
    }

    async cleanUp() {
        this.data = {
            username: typeof this.data.username === 'string' ? this.data.username.trim() : '',
            email: typeof this.data.email === 'string' ? this.data.email.trim().toLowerCase() : '',
            password: typeof this.data.password === 'string' ? this.data.password : '',
            otp: this.data.otp,
            otpExpires: this.data.otpExpires,
            isVerified: this.data.isVerified || false
        };
    }

    validate() {
        let errors = [];
        if (!this.data.username || this.data.username.length < 3) {
            errors.push('Username must be at least 3 characters.');
        }
        if (!this.data.email || !validator.isEmail(this.data.email)) {
            errors.push('Valid email required.');
        }
        if (!this.data.password || this.data.password.length < 6) {
            errors.push('Password must be at least 6 characters.');
        }
        return errors;
    }

    async findByUsername(username) {
        return await this.usersCollection.findOne({ username: username });
    }

    async findByEmail(email) {
        return await this.usersCollection.findOne({ email: email });
    }

    register() {
        return new Promise(async (resolve, reject) => {
            await this.cleanUp();
            let errors = this.validate();
            if (errors.length) {
                return reject(errors);
            }
            // Check for duplicate username or email
            let existingUser = await this.usersCollection.findOne({
                $or: [
                    { username: this.data.username },
                    { email: this.data.email }
                ]
            });
            if (existingUser) {
                if (existingUser.username === this.data.username) {
                    return reject(['Username already taken.']);
                }
                if (existingUser.email === this.data.email) {
                    return reject(['Email already registered.']);
                }
            }
            const salt = await bcrypt.genSalt(10);
            this.data.password = await bcrypt.hash(this.data.password, salt);
            let user = await this.usersCollection.insertOne(this.data);
            resolve(user.insertedId);
        })
    }

    async login() {
        await this.cleanUp();
        let user = await this.usersCollection.findOne({ username: this.data.username });
        if (!user) {
            throw ['Invalid credentials.'];
        }
        const isMatch = await bcrypt.compare(this.data.password, user.password);
        if (!isMatch) {
            throw ['Invalid credentials.'];
        }
        return user;
    }
}