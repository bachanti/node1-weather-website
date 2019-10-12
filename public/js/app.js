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


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    console.log('testing')

    if(!search.value)  {
       return  console.log('you need to enter the place')
    }
    console.log('the search place is ' + search.value)

    const url =  'http://localhost:3000/weather?address='+search.value

    messageOne.textContent = 'Loading Data'
    messageTwo.textContent = ' '

    fetch(url).then((response) => {

        response.json().then ( (data ) => {

            console.log(data.forecast)

            if (data.error) {

                messageOne.textContent = data.error
            } else 
            {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }


        } )

    }  )


})


