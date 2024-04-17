class Game{
    constructor(Document=Element,Container=Element){
        this.tick = 120*2
        this.step = 20
        this.size = []
        this.document = Document
        this.container = Container
        this.key = []
        this.running = []
        this.instances = {}
        this.players = {'vinicius':{
            'name':'vinicius',
            'score':0,
            'position':[0,0]
        }}
        this.name_players = ['vinicius']

        this.velocity = [0,0]

        this.get_key()
    }

    get_key(){
        this.document.onkeydown = (event) =>{
            this.key.indexOf(event.key) == -1 ? this.key.push(event.key) : {}
        }
        this.document.onkeyup = (event) =>{
            let index = this.key.indexOf(event.key)
            index != -1 ? this.key.splice(index,1) : {}
        }
        this.document.onkeypress = () =>{
            this.moviment()
        }
    }

    get_size_window(){
        this.size = [window.screen.height-window.screenY-20,window.screen.width-window.screenX-20]
    }

    run(){
        this.processes.forEach(process=>{
            this.running = setInterval(process,this.tick)
        })
    }

    stop(){
        this.running.forEach(process=>{
            clearInterval(process)
        })
    }

    moviment(){
        if(this.key.indexOf('w') != -1){
            this.velocity[1] = 0
            this.velocity[0] = -this.step
        }
        if(this.key.indexOf('s') != -1){
            this.velocity[1] = 0
            this.velocity[0] = this.step
        }
        if(this.key.indexOf('d') != -1){
            this.velocity[0] = 0
            this.velocity[1] = this.step
        }
        if(this.key.indexOf('a') != -1){
            this.velocity[0] = 0
            this.velocity[1] = -this.step
        }
        if(this.key.indexOf('r') != -1){
            this.stop()
            console.log('stoped')
        }
    }

    generate_apple(){
        
    }

    show_party(){
        let interval = setInterval(() => {
            this.name_players.forEach(name=>{
                this.get_size_window()
                if(this.players[name].position[1] >= this.size[1]){this.players[name].position[1] = -20}
                if(this.players[name].position[1] < -20){this.players[name].position[1] = this.size[1]}
                this.players[name].position[1] += this.velocity[1]

                if(this.players[name].position[0] >= this.size[0]){this.players[name].position[0] = 0}
                if(this.players[name].position[0] < 0){this.players[name].position[0] = this.size[0]}
                this.players[name].position[0] += this.velocity[0]
                this.instances[name].style.inset = `${this.players[name].position[0]}px ${this.players[name].position[1]}px`
            })
        }, this.tick);

        this.running.push(interval)
    }

    add_player(){}

    show_players(){
        this.name_players.forEach(name=>{
            //OP : Object Player
            let color = `#${(Math.random()*9).toFixed(0)}${(Math.random()*9).toFixed(0)}${(Math.random()*9).toFixed(0)}`
            let op = document.createElement('div')
            op.setAttribute('class','player')
            console.log(this.players[name].position[0])
            op.style.inset = `${this.players[name].position[0]}px ${this.players[name].position[1]}px`
            let name_op = document.createElement('span')
            name_op.setAttribute('class','name')
            name_op.innerHTML = name
            let body = document.createElement('div')
            body.setAttribute('class','body')
            body.style.backgroundColor = color
            op.appendChild(name_op)
            op.appendChild(body)
            this.container.appendChild(op)
            this.instances[name] = op
        })
    }

    remove_player(){}
}

const container = document.querySelector('#container')

const game = new Game(document,container)
game.show_players()
game.show_party()