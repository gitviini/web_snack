class Player{
    constructor(){
        this.name = ''
        this.position = [0,0]
        this.step = 20
        this.size = [400, 400]
        this.key = []
        this.velocity = [0,0]

        this.get_key()
    }
    question(socket){
        let name = prompt('digite seu nick:')
        if(name.indexOf(' ') != -1){
            question()
            return false
        } 
        else{
            socket.emit('new_player',{'name':name})
            this.name = name
            return true
        }
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
    }

    position_load(){
        if(this.position[1] >= this.size[1]-20 && this.velocity[1] > 0){this.position[1] = -20}
        if(this.position[1] <= 0 && this.velocity[1] < 0){this.position[1] = this.size[1]}
        this.position[1] += this.velocity[1]
        
        if(this.position[0] >= this.size[0]-20 && this.velocity[0] > 0){this.position[0] = -20}
        if(this.position[0] <= 0 && this.velocity[0] < 0){this.position[0] = this.size[0]}
        this.position[0] += this.velocity[0]
    }
}