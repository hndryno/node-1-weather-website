const request = require('request')

const geocode = (address, callback) => {
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaGVuZHJpeW9ubyIsImEiOiJjanppZnVuamMxNmNoM25sa3luc3FlYzIwIn0.lebTtvPe2esVp3S1TslcUw'
    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback('tidak bisa tersambung dengan weather-app', undefined)
        }else if(response.body.features.length === 0){
            callback('Tidak bisa menemukan lokasi. Coba cari ulang lokasi', undefined)
        }else{
            const features = response.body.features[0].center
            callback(undefined, {
                longitude: features[0],
                latitude: features[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode