var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $timeHeader = document.querySelector('#time-header')
var $result = document.querySelector('#result')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

var score = 0
var gameStarted = false
var colors = ['#5C258D', '#4389A2', '#085078', '#85D8CE', '#8E54E9', '#4776E6',
 '#FF8008', '#EB3349', '#F45C43', '#FFC837']

$start.addEventListener('click', startGame)
$game.addEventListener('click', clickOnBox)
$gameTime.addEventListener('input', setGameTime)

function hide($el){
    $el.classList.add('hide')
}

function show($el){
    $el.classList.remove('hide')
}

function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    hide($resultHeader)
    show($timeHeader)
    gameStarted = true
    $game.style.backgroundColor = ('#fff')
    hide($start)

    var interval = setInterval(function() {
        var time = parseFloat($time.textContent)

        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)

    renderBox()
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function endGame() {
    gameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($resultHeader)
    hide($timeHeader)
    $game.innerHTML = ''
    $game.style.backgroundColor = ('#ccc')
    show($start)
}

function clickOnBox(event) {
    if (!gameStarted) {
        return
    }
    
    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}

 function renderBox() {
 var box = document.createElement('div')
 $game.innerHTML = ''
 var boxSize = getRandom(30, 100)
 var gameSize = $game.getBoundingClientRect()
 var maxTop = gameSize.height - boxSize
 var maxLeft = gameSize.width - boxSize
 var colorRandom = getRandom(0, colors.length) 

 box.style.height = box.style.width = boxSize + 'px'
 box.style.position = 'absolute'
 box.style.backgroundColor = colors[colorRandom]
 box.style.top = getRandom(0, maxTop) + 'px'
 box.style.left = getRandom(0, maxLeft) + 'px'
 box.style.cursor = 'pointer'
 box.setAttribute('data-box', true)

 $game.insertAdjacentElement('afterbegin', box)

 }

 function getRandom(min, max) {
     return Math.floor(Math.random() * (max - min) + min)
 }