const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Access denied. No valid Authorization header." });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. Token missing." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decoded.userId, ...decoded }; // Normalize userId to _id
        next();
    } catch (err) {
        console.error("JWT verify failed:", err);
        return res.status(401).json({ message: "Invalid or expired token", error: err.message });
    }
};

module.exports = auth;
