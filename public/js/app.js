console.log('I am a client side script')

// fetch('http://localhost:3000/weather?address=calcutta').then ((response) => {

//     response.json().then( (data) => {
//      console.log(data)

//     }
    
//     )

// })

const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

var messageOne = document.querySelector('#message-1')
var messageTwo = document.querySelector('#message-2')
var messageThree = document.querySelector('#message-3')
var messageFour = document.querySelector('#message-4')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    console.log('testing')

    if(!search.value)  {
       return  console.log('you need to enter the place')
    }
    console.log('the search place is ' + search.value)

    const url =  '/weather?address='+search.value

    console.log(url)
    messageOne.textContent = 'Loading Data'
    messageTwo.textContent = ' '
    messageThree.textContent = 'three '
    messageFour.textContent = 'four'



    fetch(url).then((response) => {

        response.json().then ( (data ) => {

            console.log(data)

            if (data.error) {

                messageOne.textContent = data.error
            } else 
            {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                messageThree.textContent = data.lowTemperature
                messageFour.textContent = data.maxTemperature
            }


        } )

    }  )


})


