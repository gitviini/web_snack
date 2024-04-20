import express from 'express'
const app = express()
import http from 'http'
const server = http.createServer(app)
import {Server} from 'socket.io'
import {Game} from './public/game.js'
const io = new Server(server)
const PORT = 5000

const game = new Game()

app.use(express.static('public'))

app.route('/')
    .get((req,res)=>{
        app.sendFile(__dirname+'/public/index.html')
    })

io.on('connect',socket=>{
    socket.emit('geral_infos',({'id_list':game.id_list,'players':game.players,'apple_position':game.apple_position}))

    socket.on('new_player',({name})=>{
        io.emit('warning_new_player',game.new_player(socket.id,name))
    })
    socket.on('load_infos',({position})=>{
        game.load_infos(socket.id,position)
    })
    socket.on('disconnect',()=>{
        if(game.id_list.indexOf(socket.id) != -1){
            game.remove_player(socket.id)
            io.emit('warning_remove_player',({'id':socket.id}))
        }
    })
})

setInterval(() => {
    io.emit('send_infos',game.send_infos())
    game.verify_position() == true ? io.emit('warning_generate_apple',({'apple_position':game.apple_position})) : {}
}, (game.tick));

server.listen(PORT, ()=>{
    console.log(':.',PORT)
})