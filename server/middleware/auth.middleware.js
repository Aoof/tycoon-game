import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({
            success: false,
            message: 'Unauthorized',
            data: error
        });
    }
}

export default authMiddleware;