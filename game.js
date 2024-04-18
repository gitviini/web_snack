class Game{
    constructor(Container=Element, Score_list=Element, Button=Element){
        this.tick = 120
        this.step = 20
        this.size = [400, 400]
        this.apple_position = []
        this.score_list = Score_list
        this.container = Container
        this.button = Button
        this.key = []
        this.running = []
        this.instances = {}
        this.players = {}
        this.name_players = []

        this.velocity = [0,0]

        this.get_key()
        this.generate_apple()
        this.generate_score_list()

        this.button.onclick = () => this.question()
    }

    

    get_key(){
        document.onkeydown = (event) =>{
            this.key.indexOf(event.key) == -1 ? this.key.push(event.key) : {}
            this.moviment()
        }
        document.onkeyup = (event) =>{
            let index = this.key.indexOf(event.key)
            index != -1 ? this.key.splice(index,1) : {}
        }
    }

    stop(){
        this.running.forEach(process=>{
            clearInterval(process)
        })
    }

    moviment(){
        if(this.key.indexOf('w') != -1 || this.key.indexOf('ArrowUp') != -1){
            this.velocity[1] = 0
            this.velocity[0] = -this.step
        }
        if(this.key.indexOf('s') != -1 || this.key.indexOf('ArrowDown') != -1){
            this.velocity[1] = 0
            this.velocity[0] = this.step
        }
        if(this.key.indexOf('d') != -1 || this.key.indexOf('ArrowRight') != -1){
            this.velocity[0] = 0
            this.velocity[1] = this.step
        }
        if(this.key.indexOf('a') != -1 || this.key.indexOf('ArrowLeft') != -1){
            this.velocity[0] = 0
            this.velocity[1] = -this.step
        }
        if(this.key.indexOf('r') != -1){
            this.stop()
            console.log('stoped')
        }
    }

    generate_score_list(){
        this.score_list.innerHTML = ''
        this.name_players.forEach(name=>{
            let score = document.createElement('span')
            score.setAttribute('class','score')
            score.innerHTML = `${name} : ${this.players[name].score}`
            this.score_list.appendChild(score)
        })
    }

    verify_position(name){
        if(this.players[name].position[0] == this.apple_position[0] && this.players[name].position[1] == this.apple_position[1]){
            this.players[name].score++
            this.generate_apple()
            this.generate_score_list()
        }
    }

    generate_apple(){
        let x = ((Math.random()*(this.size[1]-20)/20).toFixed(0))*20
        let y = ((Math.random()*(this.size[0]-20)/20).toFixed(0))*20

        apple.style.inset = `${y}px ${x}px`

        this.apple_position = [y,x]
    }

    show_party(){
        let interval = setInterval(() => {
            this.name_players.forEach(name=>{
                if(this.players[name].position[1] >= this.size[1]-20 && this.velocity[1] > 0){this.players[name].position[1] = -20}
                if(this.players[name].position[1] <= 0 && this.velocity[1] < 0){this.players[name].position[1] = this.size[1]}
                this.players[name].position[1] += this.velocity[1]
                
                if(this.players[name].position[0] >= this.size[0]-20 && this.velocity[0] > 0){this.players[name].position[0] = -20}
                if(this.players[name].position[0] <= 0 && this.velocity[0] < 0){this.players[name].position[0] = this.size[0]}
                this.players[name].position[0] += this.velocity[0]
                this.instances[name].style.inset = `${this.players[name].position[0]}px ${this.players[name].position[1]}px`
                this.verify_position(name)
            })
        }, this.tick);

        this.running.push(interval)
    }

    new_player(name){
        if(this.name_players.indexOf(name) == -1){
            this.players[name] = {
                'score':0,'position':[0,0]
            }
            this.name_players.push(name)
            this.generate_score_list()
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
        }
    }

    question(){
        let name = prompt('digite o nick:')
        
        name.indexOf(' ') == -1 ? this.new_player(name) : this.question()
    }

    remove_player(){}
}