const socket = io()

const user = document.getElementById('name').innerHTML
const l_online = document.getElementById('user').innerHTML
const u_online = document.getElementById('users_online')
const hed = document.getElementById('hed')
const chat_window = document.getElementById('chat_window')
const chat_input = document.getElementById('chat_input')
const send_button = document.getElementById('send')


// Users online count

socket.emit('online',{
    u_online: u_online.innerHTML
})

socket.on('users',(us)=>{
    u_online.innerHTML = `online: ${us.u_online}`

})

// last user that entered

socket.emit('last_online',{
    l_online: l_online    
})

// Send messaje

send_button.addEventListener('click',()=>{

    if(chat_input.value.length >= 1){
        socket.emit('messaje',{
            chat_input: chat_input.value,
            user: user
        })

        chat_input.value = ''
        hed.innerHTML = l_online
    }
   
})

socket.on('send_messaje',(ms)=>{

    chat_window.innerHTML += `
    <div> 
        <div id='messaje'>
            <p class='u_messaje'>
                <strong class='u_name'>${ms.user}:</strong> ${ms.chat_input}
            </p>
        </div>
    </div>
    `
})

// User typing

chat_input.addEventListener('keypress', ()=>{
    if(chat_input.value.length > 3){
        socket.emit('u_typing', l_online)
    }
})

socket.on('typing',(use)=>{
    hed.innerHTML = `${use} is typing . . .`

    setTimeout(() => {
        hed.innerHTML = l_online
    }, 5000);
})

socket.on('last',(ls)=>{
    document.getElementById('user').innerHTML = `${ls.l_online} entered!`
    setTimeout(() => {
        document.getElementById('user').innerHTML = l_online
    }, 3000);
})