const request = require('request')


const geocode = (place , callback ) => {

    const geocodeurlA = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    const geocodeurlB = '.json?access_token=pk.eyJ1IjoiYmFjaGFudGkiLCJhIjoiY2p5dThpMWhiMDNjOTNobWwwaHI3YXdibSJ9.p8fecCM6fMMpNhe5r4RxaA&limit=1'
    const url = geocodeurlA+place+geocodeurlB

     request( {url, json :true } , (error , {body} ) => {

        if ( error)  {
            console.log('unable to connect to geocode service')
            callback('unable to connect to geocode service',undefined)
          }
          else if (body.error) {
              console.log('unable to get geo code values')
              callback('unable to get geo code values',undefined)
    
          }
          else if (body.features.length === 0) {
    
              console.log('unable to find the place ')
              callback('unable to find the place',undefined)
          }
          else {
          
            const  longitude =  body.features[0].center[0]
            const  latitude = body.features[0].center[1]
            const  location = body.features[0].place_name
    
          // console.log('longitude '  + longitude)
          // console.log('latitude ' + latitude)
          // console.log('place name ' + location)
           callback (undefined , {
                 longitude
               , latitude
               , location
           })           
          }
     })
}



module.exports = geocode