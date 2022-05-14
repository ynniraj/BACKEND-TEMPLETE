const express = require('express');
const Connect = require('./confiq/db');
const cookie = require('cookie-parser');
const cors = require('cors');
const { body } = require('express-validator');

const app = express();
app.use(cors())
app.use(cookie())
app.use(express.json())

const { register, login, getuserbyid } = require('./controllers/auth.controller');

const { verifyToken, verifyUser, verifyAdmin } = require('./middlewares/verifyToken');


app.post("/register",
    body('email').isEmail().withMessage({
        message: 'Not an email',
        errorCode: 1,
    }),
    body('password').isLength({ min: 6 }).withMessage({ message: 'Password must be at least 6 characters' }), register)

app.post("/login", login)

app.get("/getuserbyid/:id", [verifyUser], getuserbyid)



app.listen(8080, async () => {
    await Connect()
    console.log('Server is running on port 8080');
});