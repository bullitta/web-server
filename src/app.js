const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require ('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000
const StaticDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.use(express.static(StaticDir))

// setup handlebar engine and template dir
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'gio'
    })
})
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About this site',
        name: 'gio'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Insert the name of a geographic locality and then push the search button',
        name: 'gio'
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: 'Article not found',
        name: 'gio',
        helpText: 'Article not found'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
       return res.send({
        error: 'You must provide an address'
       })
    }
    geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, previsione) => {
            if (error) {
                return console.log(error)
            }
            
            res.send({
                place,
                previsione,

                address: req.query.address
            }) 
        })
        
    })
   
})

app.get('*', (req, res) => {
    res.render('notfound', {
        title: 'Page not found',
        name: 'gio'
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})