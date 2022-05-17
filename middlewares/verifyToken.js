const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const Authtoken = req.headers.token;
    if (!Authtoken) {
        return res.status(500).send("No token, please login");
    }
    const token = Authtoken.split(" ")[1];
    jwt.verify(token, "secretkey", (err, user) => {
        if (err) return res.status(500).send("Token is invalid");
        req.user = user;
        next();
    });
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(500).send("you are not authorized bro");
        }
    });
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(500).send("you are not authorized to do this action");
        }
    });
};


module.exports = { verifyToken, verifyUser, verifyAdmin };