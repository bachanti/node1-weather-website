const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')



console.log(__dirname)
console.log(__filename)

const publicDirectoryPathName = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


const app = express()

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)



app.use(express.static(publicDirectoryPathName))


app.get('',(req , res) => {

    res.render('index' , {title:'index page', name: 'Bhaskar Achanti', footer:'root footer'})


})


app.get('/home', (req , res) => {
  res.send('Home page !')

})

app.get('/help', (req , res) => {

   // res.send('Help page !')

   res.render('help',{
    name: 'Bhaskar Achanti',
    title : 'weather page',
    footer : 'help footer'
})
})

app.get('/weather', (req , res) => {

if (!req.query.address)  {

   return  res.send({error : 'Serach address is missing'})
}

     geocode(req.query.address , (error ,{latitude ,longitude, location } = {} ) => {

     if (error) {
         return  res.send({error: error})
     }

        forecast( latitude, longitude , (error , forecastData) => {

            if (error )
              return  res.send({error: error})

            res.send({
                address : req.query.address,
                forecast : forecastData,
                location : location ,
                latitude : latitude,
                longitude : longitude
            })
           } 
     )  
})
})


app.get('/about', (req , res) => {

   // res.send('<h1>about  !<h1>')
   res.render('about',{title:'about',name: 'Bhaskar' , footer:'footer'})
})

app.get('/help/*', (req , res) => {
    //res.send('<p>help info does not exist<p>')
    res.render('error', {title:'error page', errorMsg: 'help info does not exist' , footer :'error footer'})

})

app.get('*', (req,res) => {
  // res.send('<h1> 404 Page not found </h1>')
  res.render('error', {title:'error page', errorMsg: 'page does not  exist', footer:'error footer'})

})

app.listen(3000 , () => {

    console.log(' Web Server started and listening on port 3000')
})