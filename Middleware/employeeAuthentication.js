const jwt = require('jsonwebtoken'); 
const Userr = require('../models/User');

const authenticate = async (req, res, next) => {
    
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log("Authentication middleware called");
            return res.status(401).json({ message: "Unauthorized 1" });
        }
        
        const decoded = jwt.verify(token, 'aman');
        const user = await Userr.findById(decoded.id);

        if (!user) {
            return res.status(402).json({ message: "Unauthorized" });
        }

        if (user.role !== 'employ') {
        return res.status(403).json({ message: "Access denied" });
        }

        if (user.status !== 'approved') {
        return res.status(403).json({ message: "Access denied" });
        }

        const {username} = user;
        req.user = {username};
        
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
}

module.exports = authenticate;