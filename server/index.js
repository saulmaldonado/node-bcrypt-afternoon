require('dotenv').config()

const authCtrl = require('./controllers/authController')
const treasureCtrl =require('./controllers/treasureController')
const auth = require('./../middleware/authMiddleware')

const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {CONNECTION_STRING, SECRET_SESSION} = process.env
const app = express()
const PORT = 4000

app.use(express.json())

app.use(session({
    secret: SECRET_SESSION,
    resave: true,
    saveUninitialized: false
}))

massive(CONNECTION_STRING)
.then(db => {
    app.set('db', db)
    console.log('db connected');
})

app.post('/auth/register', authCtrl.register)

app.post('/auth/login', authCtrl.login)

app.get('/auth/logout', authCtrl.logout)

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)

app.get('/api/treasure/user', auth.usersOnly ,treasureCtrl.getUserTreasure)

app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure)

app.get('/api/treasure/all',auth.usersOnly,auth.adminsOnly ,treasureCtrl.getAllTreasure)





app.listen(PORT, () => {console.log(`listening on port ${PORT}...`);})