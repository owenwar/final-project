require('dotenv').config();
const jwt = require('jsonwebtoken'); // Assuming you're using JWT for authentication

const adminAuth = (req, res, next) => {
    try {
        // 1. Check if the user is authenticated
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 2. Verify the user's role
        if (!decoded || decoded.role !== 'admin') {
            throw new Error();
        }

        // Attach the decoded payload to the request object (optional)
        req.user = decoded;

        // 3. Allow access
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate as an admin.' });
    }
};

module.exports = adminAuth;
