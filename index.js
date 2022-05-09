const express = require('express');
const Connect = require('./confiq/db');
const cookie = require('cookie-parser');
const app = express();
app.use(cookie())
app.use(express.json())

const { register, login, getuserbyid } = require('./controllers/auth.controller');

const { verifyToken, verifyUser, verifyAdmin } = require('./middlewares/verifyToken');

app.post("/register", register)
app.post("/login", login)
app.get("/getuserbyid/:id", [verifyUser], getuserbyid)



app.listen(8080, async () => {
    await Connect()
    console.log('Server is running on port 3000');
});