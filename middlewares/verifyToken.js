const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(500).send("No token, please login");
    }

    jwt.verify(token, "secretkey", (err, user) => {
        if (err) return res.status(500).send("Token is invalid");
        req.user = user;
        next();
    });
};
const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(500).send("you are not authorized");
        }
    });
};
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(500).send("you are not authorized to do this action");
        }
    });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };