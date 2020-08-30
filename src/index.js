document.addEventListener('DOMContentLoaded', () => {
  const dogBar = document.querySelector('#dog-bar')
  const dogSummary = document.querySelector('#dog-summary-container')
  const dogUrl = 'http://localhost:3000/pups/'
  const dogInfo = document.querySelector('#dog-info')

  const getDoggos = () => {
    fetch(dogUrl)
      .then(response => response.json())
      .then(doggos => renderDoggos(doggos))
  }

  const renderDoggos = doggos => {
    for (const doggo of doggos) {
      doggoSpan(doggo)
    }
  }

  const doggoSpan = doggo => {
    const span = document.createElement('span')
    span.dataset.id = `${doggo.id}`
    span.textContent = `${doggo.name}`

    span.addEventListener('click', e => {
      doggo = e.target
      getDoggo(doggo)
    })

    dogBar.append(span)
  }

  const getDoggo = doggo => {
    fetch(dogUrl + `${doggo.dataset.id}`)
      .then(response => response.json())
      .then(doggo => renderDoggo(doggo))
  }

  const renderDoggo = doggo => {
    dogInfo.innerHTML = ""

    dogImage = document.createElement('img')
    dogImage.src = doggo.image

    dogName = document.createElement('h2')
    dogName.innerText = doggo.name

    dogButton = document.createElement('button')
    dogButton.innerText = doggo.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
    dogButton.dataset.id = doggo.id
    dogButton.addEventListener('click', toggleDoggoStatus)

    dogInfo.append(dogImage, dogName, dogButton)
  }

  const toggleDoggoStatus = e => {
    let newValue;
    if (e.target.innerText.includes('Good')) {
      e.target.innerText = 'Bad Dog!'
      newValue = false
    } else {
      e.target.innerText = 'Good Dog!'
      newValue = true
    }
    toggleGoodDog(e.target.dataset.id, newValue)
  }

  function toggleGoodDog(id, newValue) {
    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: newValue
      })
    }
    return fetch(dogUrl + `${id}`, options)
      .then(response => response.json())
  }

  // doggoButton()
  // renderDoggo()
  // getDoggo()
  getDoggos()
})