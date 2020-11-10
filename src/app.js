const path = require('path')
const express = require('express')
const app = express()
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
    // if (!req.query.address) {
    //     return res.send('you must provide a Address')
    // }
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

    // geocode(req.query.address, (error,{latitude,longitude,location}) => {
    //     if (error) {
    //         return res.send({error:error})
    //     }
            forecast(req.query.address, (error,locationdata) => {
                if (error) {
                return res.send({error:error})
                }

                res.send({
                    forecast: locationdata,
                   // location,
                    address: req.query.address
                    

                })

            })
            
        
    })
// })

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Naveen Sekar',
        errormessage:'Page not found'
    })
    })
        


app.listen(3000,() => {
    console.log('Server started at port 3000')
})

// app.get('/help', (req, res) => {
//     res.send('<h1>help</h1>')
// })

// app.get('/about', (req, res) => {
//     res.send('About page')
// })

