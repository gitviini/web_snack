const socket = io()

const apple = document.querySelector('#apple')
const container = document.querySelector('#container')
const score_list = document.querySelector('#score_list')
const button = document.querySelector('#new_player')

const player = new Player()
const view = new View(container,apple)

let a = 0

socket.on('geral_infos',({id_list,players,apple_position})=>{
    view.generate_apple(apple_position)
    id_list.forEach(id=>{
        view.new_player(id,players[id])
    })
    button.onclick = () =>{
        
        player.question(socket) == true ? button.style.visibility = 'hidden' : {}
    }
})

socket.on('send_infos',({id_list,players})=>{
    view.gerenate_party(id_list,players)
    player.position_load()
    socket.emit('load_infos',({'position':player.position}))
})

socket.on('warning_generate_apple',({apple_position})=>{
    view.generate_apple(apple_position)
})

socket.on('warning_new_player',({id,player})=>{
    view.new_player(id,player)
})

socket.on('warning_remove_player',({id})=>{
    view.remove_player(id)
})