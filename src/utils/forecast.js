const request = require('request')

const forecast = ( latitude , longitude , callback) => {

    const darkskyurlA = 'https://api.darksky.net/forecast/203c74d6edc7faccdda9c58f4463cea5/'
    const weatherURL = darkskyurlA+latitude+','+longitude+'?units=si'


    request({url : weatherURL , json : true},
        (error,response ) => {
  
          if (error) {
              callback('unable to connect to weather service', undefined)
          }
         
          else if (response.body.error) {
              callback('uanble to find a location',undefined)
          }
            else 
          {
            const temperature  = response.body.currently.temperature
            const chanceOfRain = response.body.currently.precipIntensity
            const maxTemperature = response.body.daily.data[0].temperatureHigh
            const lowTemperature = response.body.daily.data[0].temperatureLow
            const forecastData = 'it is currently ' + temperature + 
            ' degrees  and there is a   ' + chanceOfRain   + '% chance of rain'
            callback(undefined, {forecastData , maxTemperature, lowTemperature})
          }
      
            
        }
      )


}

module.exports = forecast
