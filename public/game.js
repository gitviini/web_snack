class Game{
    constructor(/*Container=Element, Score_list=Element, Button=Element*/){
        this.tick = 120
/*     
        this.apple_position = []
        this.score_list = Score_list
        this.container = Container
        this.button = Button
        this.running = []
*/      this.instances = {}
        this.players = {}
        this.id_list = []
        this.apple_position = []
        this.size = [400,400]

        this.generate_apple()
/*        
        this.generate_apple()
        this.generate_score_list()

        this.button.onclick = () => this.question()
*/    }

    

/*    

    stop(){
        this.running.forEach(process=>{
            clearInterval(process)
        })
    }

    generate_score_list(){
        this.score_list.innerHTML = ''
        this.id_list.forEach(name=>{
            let score = document.createElement('span')
            score.setAttribute('class','score')
            score.innerHTML = `${name} : ${this.players[name].score}`
            this.score_list.appendChild(score)
        })
    }

    show_party(){
        let interval = setInterval(() => {
            this.id_list.forEach(name=>{
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
        if(this.id_list.indexOf(name) == -1){
            this.players[name] = {
                'score':0,'position':[0,0]
            }
            this.id_list.push(name)
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
*/
    send_infos(){
        return {'id_list':this.id_list,'players':this.players,}
    }

    load_infos(id,position){
        if(this.players[id]){
            this.players[id].position = position
        }
    }

    new_player(id,name){
        let verify = true
        this.id_list.forEach(id=>{
            this.players[id].name == name ? verify = false : {}
        })
        if(verify){
            this.id_list.indexOf(id) == -1 ? this.id_list.push(id) : {}
            let player = {
                'name':name,
                'score':0,
                'position':[0,0],
                'color': `#${(Math.random()*9).toFixed(0)}${(Math.random()*9).toFixed(0)}${(Math.random()*9).toFixed(0)}`,
            }
            
            this.players[id] = player
            
            return {'id':id,'player':player}
        }
    }

    remove_player(id){
        let index = this.id_list.indexOf(id)
        this.id_list.splice(index,1)
        delete this.players[id]
    }

    verify_position(){

        let verify = false

        this.id_list.forEach(id=>{
            if(this.players[id].position[0] == this.apple_position[0] && this.players[id].position[1] == this.apple_position[1]){
                this.players[id].score++
                this.generate_apple()
                //this.generate_score_list()

                verify = true
            }
        })
        return verify
    }

    generate_apple(){
        let x = ((Math.random()*(this.size[1]-20)/20).toFixed(0))*20
        let y = ((Math.random()*(this.size[0]-20)/20).toFixed(0))*20

        this.apple_position = [y,x]
    }
}

export {Game}