// modules:
const express = require('express')
const http = require('http')
const path = require('path')
const session = require('express-session')
const bodyparser = require('body-parser')

/*
    setting:    
*/
const app = express()


// View engine and views files:
app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'./views'))

// Estatic files:
app.use(express.static(path.join(__dirname,'./public')))

// Sessions: 
app.use(bodyparser.urlencoded({extended: true}))
app.use(session({
    secret: 'something',
    resave:false,
    saveUninitialized:false
}))


// Server settings:
app.set('port', process.env.PORT || 3000)

const server = http.createServer(app)
const routes = require('./routes/route')
app.use('/', routes())
server.listen(app.get('port'),()=>{
    console.log(`running at ${app.get('port')}`)
})

// Sokets settings:
const socketio = require('socket.io')

const sockets = socketio(server)

sockets.on('connection', (socket)=>{

    exports.number = sockets.engine.clientsCount

    // Send messaje
    socket.on('messaje',(ms)=>{
        sockets.sockets.emit('send_messaje', ms)
    })

    // Users online count
    socket.on('online',(onlin)=>{
        sockets.sockets.emit('users', onlin)
    })

    // Last user that entered
    socket.on('last_online',(last)=>{
        socket.broadcast.emit('last', last)
    })

    // User typing
    socket.on('u_typing',(use)=>{
        socket.broadcast.emit('typing',use)
    })
})