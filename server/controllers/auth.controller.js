import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import otpTemplate from './otptemplate.js';

import User from '../models/User.js';

let generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtpEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        service: 'smtp.ethereal.email',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWD
        },
    });


    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP Code for Tycoon Game by aoof',
        text: `Your OTP code is ${otp}`,
        html: otpTemplate().replace("${{otp}}", otp).replace("${{username}}", email.split('@')[0])
    });
}

let register = async (req, res) => {
    console.log(req.body);
    if (!req.body) {
        return res.send({ success: false, message: 'Please enter all fields' });
    }
    const { username, password, email } = req.body;

    try {
        const otp = generateOtp();
        const otpExpires = Date.now() + 5 * 60 * 1000;

        let user = new User({
            username,
            password,
            email,
            otp,
            otpExpires,
            isVerified: false
        });

        user.register().then(async userId => {
            await sendOtpEmail(email, otp);
            res.send({success: true, message: 'OTP sent to email', data: {
                id: userId,
                username,
                email,
                isVerified: false
            } });
        }).catch(err => {
            res.send({ success: false, message: 'User registration failed', data: err });
        })
    } catch (err) {
        res.send({ success: false, message: 'Server error' });
    }
};

let login = async (req, res) => {
    if (!req.body) {
        return res.send({ success: false, message: 'Please enter all fields' });
    }
    const { username, password } = req.body;

    if (!username || !password) {
        return res.send({ success: false, message: 'Please enter all fields' });
    }
    let user = new User({
        username,
        password
    });

    await user.login().then(async user => {
        const payload = {
            user: {
                id: user._id.toString(),
                username: user.username,
                isVerified: user.isVerified
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.send({ token, success: true, message: 'Login successful' });
            }
        );
    }).catch(err => {
        res.send({ success: false, message: 'Server error please contact administrators.' });
    });
};

let logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send({ success: false, message: 'Server error please contact administrators.' });
        }
        res.send({ success: true, message: 'Logout successful' });
    });
}

let verify = async (req, res) => {
    if (req.user) {
        res.send({ data: req.session.user, success: true, message: 'Authorized' });
    } else {
        res.send({ success: false, message: 'Not authorized' });
    }
}

let verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.send({ success: false, message: 'Please provide email and OTP' });
    }

    let user = new User();

    await user.findByEmail(email).then(async user => {
        if (!user) {
            return res.send({ success: false, message: 'User not found' });
        }

        if (user.otp !== otp) {
            return res.send({ success: false, message: 'Invalid OTP' });
        }

        if (Date.now() > user.otpExpires) {
            return res.send({ success: false, message: 'OTP expired' });
        }

        user.isVerified = true;
        await user.save();

        const payload = {
            user: {
                id: user.id,
                username: user.username,
                isVerified: user.isVerified
            }
        };


        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.send({ token, success: true, message: 'Registration successful', data: user });
            }
        );
    }).catch(err => {
        res.send({ success: false, message: 'Server error please contact administrators.' });
    });
};

let requestOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.send({ success: false, message: 'Please provide email' });
    }

    let user = new User();

    await user.findByEmail(email).then(async user => {
        if (!user) {
            return res.send({ success: false, message: 'User not found' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        user.otp = otp;
        user.otpExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        await sendOtpEmail(email, otp);

        res.send({ success: true, message: 'OTP sent to email' });
    }).catch(err => {
        res.send({ success: false, message: 'Server error please contact administrators.' });
    });
};

export { register, login, logout, verify, verifyOtp, requestOtp };