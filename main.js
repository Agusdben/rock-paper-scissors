import './style.css'
import 'normalize.css'

const HANDS = {
  ROCK: '✊🏿',
  PAPER: '🧻',
  SCISSORS: '✂'
}

const GAME_CONDITION = {
  [HANDS.ROCK]: {
    WIN: HANDS.SCISSORS
  },
  [HANDS.PAPER]: {
    WIN: HANDS.ROCK
  },
  [HANDS.SCISSORS]: {
    WIN: HANDS.PAPER
  }
}

const GAME_RESULTS = {
  DRAW: 'DRAW 🥱',
  WIN: 'WIN! 😍',
  LOSE: 'LOSE 😫'
}

const $playerWins = document.getElementById('player-wins')
const $machineWins = document.getElementById('machine-wins')
const $gameResult = document.getElementById('game-result')

const $rockBtn = document.getElementById('rock')
const $paperkBtn = document.getElementById('paper')
const $scissorsBtn = document.getElementById('scissors')
const handBtns = [$rockBtn, $paperkBtn, $scissorsBtn]

const disbaleHandBtns = () => {
  handBtns.forEach(btn => (btn.disabled = true))
}
const enableHandBtns = () => {
  handBtns.forEach(btn => (btn.disabled = false))
}

const createElementGameReuslt = result => {
  const span = document.createElement('span')
  span.classList.add('game__result')
  span.innerText = result
  return span
}

const clearGameResult = () => {
  setTimeout(() => {
    $gameResult.innerHTML = null
  }, 700)
}

const handleDraw = () => {
  $gameResult.appendChild(createElementGameReuslt(GAME_RESULTS.DRAW))
  clearGameResult()
}

const handleWin = () => {
  $playerWins.innerText = Number($playerWins.innerText) + 1
  $gameResult.appendChild(createElementGameReuslt(GAME_RESULTS.WIN))
  clearGameResult()
}

const handleLose = () => {
  $machineWins.innerText = Number($machineWins.innerText) + 1
  $gameResult.appendChild(createElementGameReuslt(GAME_RESULTS.LOSE))
  clearGameResult()
}

const handleGameResults = (playerChoosedHand, machineChoosedHand) => {
  const handToWin = GAME_CONDITION[playerChoosedHand].WIN
  const playerWIn = () => handToWin === machineChoosedHand

  if (playerChoosedHand === machineChoosedHand) {
    handleDraw()
    return
  }
  if (playerWIn()) {
    handleWin()
    return
  }

  handleLose()
}

function handleGame () {
  const hands = Object.values(HANDS)
  const $playerChoose = document.getElementById('player-choose')
  const $machineChoose = document.getElementById('machine-choose')

  const playerChoosedHand = this.innerText
  $playerChoose.innerText = playerChoosedHand

  disbaleHandBtns()

  let finallyChoose = 0
  let innerIndex = 0
  const chooseAt = 10
  const velocity = 100

  const machineChooseHandIndex = Math.floor(Math.random() * hands.length)

  const machinChoose = setInterval(() => {
    $machineChoose.innerText = hands[innerIndex]

    if (finallyChoose >= chooseAt && innerIndex === machineChooseHandIndex) {
      clearInterval(machinChoose)
      enableHandBtns()
      handleGameResults(playerChoosedHand, hands[machineChooseHandIndex])
    }

    if (innerIndex === hands.length - 1) {
      innerIndex = 0
    } else {
      innerIndex += 1
    }

    finallyChoose += 1
  }, velocity)
}

handBtns.forEach(btn => {
  btn.addEventListener('click', handleGame)
})
