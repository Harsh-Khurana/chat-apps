const express = require('express'),
	app = express(),
	socket = require('socket.io');

app.use(express.static('public'));

// Saving server in variable to be passed to socket to 
// apply the websockets fnality
const server = app.listen(3000,()=>{
	console.log("Server Has Started!!");
})

const io = socket(server);

// Fn says when the connection is made then fire up the callback
io.on('connection',(socket)=>{
	console.log("socket connection established",socket.id);

	// Listens for messages by the name of 'chat' from client-side
	// Just a reminder that in above anonymous fn i have kept brackets 
	// but not for this even though both are single parameter fn
	socket.on('chat',data=>{
		// This right here fires up when 'chat' message is recieved and 
		// then emits the data to all sockets
		io.sockets.emit('chat',data);
	})

	// Listens for messages by the name of 'typing' from client-side
	socket.on('typing',data=>{
		// This below says broadcast the data to all the sockets except
		// the one from which it is recieved
		socket.broadcast.emit('typing',data);
	})
})