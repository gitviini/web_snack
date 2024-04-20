class View{
    constructor(Container=Element,Apple=Element,Container_score=Element){
        this.container = Container
        this.container_score = Container_score
        this.apple = Apple
        this.instance_list = []
    }

    new_player(id, players){
        let name = players.name
        let position = players.position
        let color = players.color
        
        let player = document.createElement('div')
        player.setAttribute('class','player')
        player.style.inset = `${position[0]}px ${position[1]}px`
        let name_player = document.createElement('span')
        name_player.setAttribute('class','name')
        name_player.innerHTML = name
        let body = document.createElement('div')
        body.setAttribute('class','body')
        body.style.backgroundColor = color
        player.appendChild(name_player)
        player.appendChild(body)
        this.container.appendChild(player)
        this.instance_list[id] = player
    }
    
    remove_player(id){
        this.container.removeChild(this.instance_list[id])
        delete this.instance_list[id]
    }

    gerenate_party(id_list=[],players=[]){
        id_list.forEach(id=>{
            this.instance_list[id].style.inset = `${players[id].position[0]}px ${players[id].position[1]}px`
        })
    }

    generate_apple(position){
        this.apple.style.inset = `${position[0]}px ${position[1]}px`
    }

    generate_score_list(id_list=[],players=[]){
        this.container_score.innerHTML = ''
        id_list.forEach(id=>{
            let score = document.createElement('li')
            score.setAttribute('class','score')
            score.innerText = `${players[id].score} : ${players[id].name}`
            this.container_score.appendChild(score)
        })
    }
}