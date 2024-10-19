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

let buttons = document.getElementsByClassName('button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        socket.emit('msg', button.id);
    });
})
