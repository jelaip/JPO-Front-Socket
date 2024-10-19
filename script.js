// class button et id msg
let socketid = '';
let serverUrl = 'https://socket-jpo-server.onrender.com'
const socket = io(serverUrl);
socket.on('connect', () => {
    console.log('Connected');
});
socket.on('hashtags', (data) => {
   console.log(data);
});
socket.on('disconnect', () => {
    console.log('Disconnected');
});

//get all buttons
const buttons = document.querySelectorAll('button');
console.log(buttons);

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        console.log(button.id);
        socket.emit('msg', button.id);
    });
})
