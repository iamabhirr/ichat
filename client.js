const socket = io('http://localhost:8000');     //connection through socket.io

const form = document.getElementById('send-form');
const msgip = document.getElementById('msgip');
const msgcontainer = document.querySelector('.container');
var audio = new Audio('when.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('msg');
    messageElement.classList.add(position);
    msgcontainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = msgip.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    msgip.value ='';
})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`,'middle')
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`,'left')
})

socket.on('leave', name =>{
    append(`${name} left the chat`,'middle')
})