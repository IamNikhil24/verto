const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler((req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Auth token is missing" });

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ message: "Invalid token format" });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // attach id + role to req.user
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
});

module.exports = validateToken;
