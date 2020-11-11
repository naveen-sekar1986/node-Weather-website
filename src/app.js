const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const hbs =require('hbs')
const { get } = require('http')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define path for app config 
const Publicdir = path.join(__dirname, '../public')
const Templadtedir = path.join(__dirname, '../templates/views')
const Partialpath = path.join(__dirname,'../templates/partials')

//serving our public dir
app.use(express.static(Publicdir))

//setting up handle bars 
app.set('view engine', 'hbs')
//setting up handle bars to template dir
app.set('views',Templadtedir)
//set up partials for hbs
hbs.registerPartials(Partialpath)

app.get('', (req, res) => {
   
    res.render('index', {
        title: 'Weather App',
        name:'Naveen Sekar'
        
        
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name :'Naveen Sekar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name :'Naveen Sekar'
    })
})
app.get('/index', (req, res)=>
{
    res.render('index', {
        title: 'Index page',
        name:'Naveen Sekar'
        
})
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('Please provide an Address')
    }

            forecast(req.query.address, (error,locationdata,icon_url) => {
                if (error) {
                return res.send({error:error})
                }

                res.send({
                    forecast: locationdata,
                    icon:icon_url,
                    address: req.query.address
                    

                })

            })
            
        
    })


app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Naveen Sekar',
        errormessage:'Page not found'
    })
    })
        


app.listen(port,() => {
    console.log('Server started at port '+port)
})
