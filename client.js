// // const { ClientRequest } = require("http");

// const socket = io('http://localhost:8888');
// const form = document.getElementById('send-container');
// const messageInput = document.getElementById('messageInp')
// const messageContainer =document.querySelector(".container")

// var audio = new Audio('WhatsApp_Notification.mp3');
//  const append =(message, position)=>{
//     const messageElement = document.createElement('div');
//     messageElement.innerText = message;
//     messageElement.classList.add('message');
//     messageElement.classList.add(position);
//     messageContainer.append(messageElement);
//     if(position =='left'){
//            audio.play();
//     }
 
// }
// form.addEventListener('submit', (e) =>{
//     e.preventDefault();
//     const message = messageInput.value;
//     append(`You:${message}`,'right');
//     socket.emit('send',message);
//     messageInput.value= ''

// })

// const name1=prompt("Enter your name to join","Enter your name");
// // console.log(name1);
// socket.emit('new-user-joined',name1);


// socket.on('user-joined',name =>{
//     append(`${name} joined the chat`,'right');
// })
// socket.on('receive',data =>{
//     append(`${data.name}: ${data.message}`,'left');
// })
// socket.on('left',name =>{
//     append(`${name} left the chat`,'left');
// })


   

const socket = io('http://localhost:8000');

// Get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

// Audio that will play on receiving messages
var audio = new Audio('ting.mp3');

// Function which will append event info to the contaner
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){ 
        audio.play();
    }
}


// Ask new user for his/her name and let the server know
const name1 = prompt("Enter your name to join");
socket.emit('new-user-joined', name1);

// If a new user joins, receive his/her name from the server
socket.on('user-joined', name1 =>{
    append(`${name1} joined the chat`, 'right')
})

// If server sends a message, receive it
socket.on('receive', data =>{
    console.log("receive")
    append(`${data.name1}: ${data.message}`, 'left')
})

// If a user leaves the chat, append the info to the container
socket.on('left', name1 =>{
    append(`${name1} left the chat`, 'right')
})

// If the form gets submitted, send server the message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})
