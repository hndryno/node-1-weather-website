const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()
//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//app.com

// app.get('', (req, res) => { //request and response
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help',(req, res)=>{
//     res.send([{
//         name: 'Hendriyono',
//     },{
//         name: 'Hendri'
//     }])
// })

// app.get('/about',(req, res)=>{
//     res.send('about page')
// })

app.get('', (req, res)=>{
    res.render('index',{
        judul: 'Weather-app',
        pembuat: 'Hendriyono'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        judul: 'About',
        pembuat:'Hendriyono'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        judul: 'Help',
        isi: 'Isi dari Help',
        pembuat: 'Hendriyono'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Anda harus memasukan nama wilayah yang anda cari'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error)
            {
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     location: 'philadhelphia',
    //     day: 'Tuesday',
    //     address: req.query.address
    // })
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'Anda harus memasukan nama wilayah yang anda cari!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        judul: 'Pesan Error',
        Pembuat: 'Hendriyono',
        pesanError: 'Maaf Artikel yang anda cari tidak ditemukan!'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        judul: 'Pesan Error',
        pembuat: 'Hendriyono',
        pesanError: 'Maaf halaman yang anda cari tidak ditemukan!'
    })
})

//start the server
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})