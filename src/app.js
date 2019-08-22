const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 4200

// set paths for use
const templatesPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicPath = path.join(__dirname, '../public')

//set handlebar view engine and views
app.set('view engine', 'hbs')
app.set('views', templatesPath)
hbs.registerPartials(partialsPath)

//static public folder
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "welcome index",
        name: 'BIlal Khan'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.type) {
        return res.send({
            error: 'Please send type in query'
        })
    }
    
    res.send({
        data: ['hello'],
        type: req.query.type
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.city) {
        return res.send({
            error: 'Please send city in query'
        })
    }
    
    geocode(req.query.city, (error, {lat, lng, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        } else {
            forecast(lat, lng, (error, response) => {
                if(error) {
                    return res.send({
                        error: error
                    })
                }

                return res.send({
                    forecast: response,
                    location,
                    address: req.query.city
                })
            })
        }
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "about meeee",
        name: 'BIlal Khan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'message help here',
        title: 'Help me',
        name: 'BIlal Khan'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'help page not found',
        title: 'Error page',
        name: 'BIlal Khan'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'page not found',
        title: 'Error',
        name: 'BIlal Khan'
    })
})

app.listen(port, () => {
    console.log('server started')
})