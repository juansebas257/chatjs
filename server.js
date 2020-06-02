const app = require('express')()
const http = require('http').createServer(app)
const ioServer = require('socket.io')(http);

// serve client side
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

// Socket.io functions
// new user connected
ioServer.on('connection', (socketServer) => {
    console.log('a new user is connected!')

    // a user has been disconnected
    socketServer.on('disconnect', () => {
        console.log('a user has been disconnected!')
    })

    // custom signals
    socketServer.on('sendmessage', (params) => {
        console.log('sendmessage', params)
        // emitting message to all sockets
        ioServer.emit('receivemessage', params)
    })

})

// listen server
http.listen(3000, () => {
    console.log('Listengin on port 3000')
})