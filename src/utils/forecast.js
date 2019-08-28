const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/64593148cab0e3cae7eaf4a8bfab78f7/'+ latitude +','+ longitude +'?lang=id'
    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback('tidak bisa tersambung dengan weather-app', undefined)
        }else if(response.body.error){
            callback(response.body.error, undefined)
        }else{
            const temperature = response.body.currently.temperature
            const precipProbability = response.body.currently.precipProbability
            const summary = response.body.daily.data[0].summary
            callback(undefined, {
                timezone: response.body.timezone +' '+ summary+' temperature saat ini ' + temperature + ' derajat farenheit. Ada '+ precipProbability +' % Kemungkinan Hujan'
            })
        }
    })
}

module.exports = forecast