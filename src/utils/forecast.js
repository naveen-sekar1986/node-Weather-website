const request = require('request')
//const chalk = require('chalk')

const forcast = (quary, callback) => {
    console.log('quary', quary)
    const forcast_url = 'http://api.weatherstack.com/current?access_key=fb545a154cbc41b24972d7a871c2a8ed&query='+quary
        request({ url: forcast_url, json: true }, (error,response) => {
            if (error) {
                callback('Unable to connect to location services', undefined)
            }
            else if (response.body.error) {
            callback('Unable to find location ' +response.body.error.info),undefined
            }
            else {
              //  console.log('weather desc',response.body.current.weather_descriptions)
                callback(undefined, response.body.location.country + ' ' + response.body.current.weather_descriptions + ' Current temperature ' + response.body.current.temperature + ' celcius ' + 'feels like '
                +response.body.current.feelslike+' '+'cloud cover ' +response.body.current.cloudcover,
                response.body.current.weather_icons)
            }
    })
}
    
module.exports = forcast
