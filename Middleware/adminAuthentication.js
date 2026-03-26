const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function userAuthenticationValidation(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json("User is Unauthorized");
        }

        const decoded = jwt.verify(token, 'aman');
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json("User is Unauthorized");
        }

        if (
            (user.role === "admin" || user.role === "employee" || user.role === "manager") &&
            user.status === "approved"
        ) {
            req.user = {
                userId: user._id,
                userName: user.userName,
                role: user.role,
                status: user.status
            };
            next();
        } else {
            return res.status(403).json("Not Authorized Or Inactive");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error");
    }
}

module.exports = userAuthenticationValidation;
