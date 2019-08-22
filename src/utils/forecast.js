const request = require('request')

const getForecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/023c0ae27e657749ca94d6cd16c7560c/"+latitude+","+longitude

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect", undefined)
        } else if (body.error) {
            callback("incorrect lat lng", undefined)
        } else {
            const currently = body.currently
            callback(undefined, "it is "+currently.temperature+" and "+currently.precipProbability+"% chance of rain")
        }
    })
}

module.exports = getForecast