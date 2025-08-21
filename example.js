

// Functions with parameters review
// 
function addNumbers(x, y) {
  // console.log('➕', 10 + 500)
  console.log(x, '➕', y, '=', x + y)
  return x + y // "returns" the result to the caller of the function
}

let lizards = [
  { name: 'Larry', type: '🦎' },
  { name: 'Rex', type: '🦖' },
  { name: 'Perry', type: '🐉' },
]

let larryTheLizard = lizards.find((lizard) => lizard.name == 'Larry')
let rexTheLizard = lizards.find((lizard) => lizard.name == 'Rex')


function getLizard(lizardName) {
  let selectedLizard = lizards.find((lizard) => {
    console.log("👁️", lizard)
    return lizard.name.toLowerCase() == lizardName.toLowerCase()
  })
  console.log('🔍', selectedLizard)
  if (selectedLizard == undefined) {
    console.warn(`WHO IS THAT I DON'T HAVE LIZARD CALLED ${lizardName}`)
  }
  return selectedLizard
}

function greeting() {
  console.log('👋🤠')
}

// note starts the time, then delays the "endTime" function by the delay
function startTime(seconds) {
  console.log('⏳', new Date())
  setTimeout(endTime, seconds * 1000)
}

function endTime() {
  console.log('🏁', new Date)
}

// higher order function (function, that takes in a function)
// the function passed in is called a "callback function"
function delayFunction(seconds, functionToDelay) {
  console.log('🧙‍♂️ "TIME WARP"')
  setTimeout(functionToDelay, seconds * 1000)
}

// the arrow function in array methods is ALSO a callback function
// lizards.forEach((lizard)=>...)

// Timeouts - create a delay to call a "function"
setTimeout(greeting, 1000 * 5) // common writing to say 5 seconds

// Intervals - repeat a function with a delay in between each call
let timer = 20
let paused = false
function tickTimer() {
  if (paused == false) {
    timer -= 1
    console.log('🕰️', timer)
  }
  // this could be an accurate representation of a clock
  // console.log('🕰️', new Date())
  // document.body.innerText = new Date()
  if (timer == 0) {
    console.log("times up!");
    timer = 20
  }
}

let tickInterval = setInterval(tickTimer, 1000)

// clearInterval(tickInterval) // this can stop a interval