//const chalk = require('chalk')
const request = require('request')

const geocode = (address,callback) => {
    const map_box_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmF2ZWVubmE0NCIsImEiOiJja2dpMnd3Mm0wMXA2Mnhsb2xlam11OWUwIn0.0oNqFCY05iB0fAVxiORSyA'
    request({ url: map_box_url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services',undefined)
        }
        else if (response.body.features.length === 0) {
            callback('Unable to find location - Try another location',undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })
}


module.exports = geocode
