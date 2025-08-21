console.log('🦒🦍🐅')

// 💾 DATA (GAME STATE) ---------------------------------------

let animals = [
  {
    name: 'harambe',
    emoji: '🦍',
    hunger: 100,
    status: '😁'
  },
  {
    name: 'whiskers',
    emoji: '🐅',
    hunger: 100,
    status: '😁'
  },
  {
    name: 'dr.strange',
    emoji: '🦒',
    hunger: 100,
    status: '😁'
  },
]

let bank = 0


// 🧠⚡ LOGICAL FUNCTIONS (functions that change data) ----------------

function animalsHunger() {
  animals.forEach((animal) => {
    animal.hunger -= 2
    if (animal.hunger < 0) animal.hunger = 0 // keeps the hunger from going negative
  });
  // console.log(animals)
  updateAnimalsStatuses()
  drawAnimals()
}

// start the interval so the animals get hungry over time
setInterval(animalsHunger, 1000)

function feedAnimalByName(animalName) {
  if (bank < 10) return // return here, stops the function early

  bank -= 10

  console.log('🍉', animalName)
  let animalToFeed = getAnimal(animalName)
  animalToFeed.hunger += 5
  if (animalToFeed.hunger > 100) animalToFeed.hunger = 100 // don't let the hunger go over 100
  updateAnimalsStatuses()
  drawAnimals()
  drawBank()
}


// takes in a name and returns the animal object from 'animals' but will warn you if that animal doesnt exist
function getAnimal(animalName) {
  let selectedAnimal = animals.find((animal) => animal.name == animalName)
  console.log('🔍', selectedAnimal)
  if (selectedAnimal == undefined) console.warn(`Could not find: ${animalName}`)
  return selectedAnimal
}

function updateAnimalsStatuses() {
  animals.forEach((animal) => {
    if (animal.hunger > 80) {
      animal.status = '😁'
    } else if (animal.hunger > 30) {
      animal.status = '😐'
    } else if (animal.hunger > 0) {
      animal.status = '😖'
    } else {
      animal.status = '😵'
    }
  })
  drawCurrentPayCheck()
}


function collectMoney() {
  bank += calculatePaycheck()
  drawBank()
}

setInterval(collectMoney, 1000 * 10)


// NOTE separating out the calculation from adding the paycheck to the bank, let's us re-use this function, so it can be used for both modifying the back value in "collectMoney" and draw the paycheck number in "drawCurrentPaycheck" 
function calculatePaycheck() {
  let paycheck = 0
  animals.forEach((animal) => {
    // paycheck += 50
    // switch statements "Fall through"
    switch (animal.status) {
      case '😂':  // utilizing fall through
      case '😁': paycheck += 50
        break // break stops the fall through effect
      case '😐': paycheck += 35
        break
      case '😖': paycheck += 15
        break
      case '😵': paycheck -= 10
    }
  })
  console.log('💰', paycheck)
  return paycheck
}


// 🖌️🎨 VISUAL FUNCTIONS (functions that draw data to page)-------------

let bankElement = document.getElementById('bank-amount')
let payheckElement = document.getElementById('paycheck-amount')

function drawAnimals() {
  animals.forEach((animal) => {
    let animalStatsElement = document.getElementById(`${animal.name}-stats`)
    // console.log(`${animal.name}-stats`, animalStatsElement);
    // let animalStatsElement = getAnimalStatsElement(animal.name)

    animalStatsElement.innerHTML = `${animal.hunger}${animal.status}`
  })
}



// NOTE a "helper function" could be used to better get animal elements since getting elements dynamically in loops can often raise errors when not careful
function getAnimalStatsElement(animalName) {
  let animalStatsId = `${animalName.toLowerCase()}-stats`
  let animalStatsElement = document.getElementById(animalStatsId)
  if (animalStatsElement == null) {
    console.warn("The animal name is messed up dude, or there is no element there:", animalStatsId)
  }
  return animalStatsElement
}

function drawBank() {
  bankElement.innerText = `${bank}` // turns the number into a string
  updateCursor()
}

function drawCurrentPayCheck() {
  let paycheck = calculatePaycheck()
  payheckElement.innerText = `${paycheck}`
}

function updateCursor() {
  if (bank < 10) {
    document.body.style = `
    cursor: not-allowed !important;
    `
  } else {
    document.body.style = `
    cursor: unset;
    `
  }
}

drawBank()