// Setting up the websocket connection with the server
const socket = io.connect('http://localhost:3000');

// targetting all DOM elements required 
const handle = document.getElementById('handle'),
	output = document.getElementById('output'),
	message = document.getElementById('message'),
	sendBtn = document.getElementById('send'),
	feedback = document.getElementById('feedback');

// Onclick of send btn submit the data to the server
sendBtn.addEventListener('click',()=>{
	if(handle.value.length>0&&message.value.length>0){
		// So this emits the data to the server and the message name is 'chat'
		// and message data is an object which is 2nd argument as seen
		socket.emit('chat',{
			message:message.value,
			handle:handle.value
		})
		message.value='';
	}
})

// onKeypress in message input this fn will send the data to server
message.addEventListener('keypress',()=>{
	// emit the msg named 'typing' which has handle value to server
	socket.emit('typing',handle.value)
})

//// Fns that listens for any data recieved from server and updates the view ////

// This below says if a message named 'chat' is recieved then fire up the callback
socket.on('chat',(data)=>{
	// add to the original html content
	feedback.innerHTML = '';
	if(data.handle === handle.value){
		output.innerHTML += `<p><strong>You :</strong> ${data.message}</p>`;
	}else{
		output.innerHTML += `<p><strong>${data.handle} :</strong> ${data.message}</p>`;
	}
})

// This below listens for a message named 'typing' and then updates the DOM
socket.on('typing',(data)=>{
	feedback.innerHTML = `<p><em>${data} is typing ...</em></p>`
})