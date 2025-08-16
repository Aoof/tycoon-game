import Router from 'express';
import auth from '../middleware/auth.middleware.js';
import { register, login, logout, verify, verifyOtp, requestOtp } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.post('/verify', auth, verify);
router.post('/verify-otp', verifyOtp);
router.post('/request-otp', requestOtp);

export default router;