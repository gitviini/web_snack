
const apple = document.querySelector('#apple')
const container = document.querySelector('#container')
const score_list = document.querySelector('#score_list')
const button = document.querySelector('#new_player')

const game = new Game(container,score_list,button)
game.show_party()
