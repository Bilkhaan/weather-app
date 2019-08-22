const request = require('request')

const getGeocodeData = (name, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(name)+".json?access_token=pk.eyJ1IjoiYmlsa2hhYW4iLCJhIjoiY2p4c3h5bG05MG9xcjNucWZoYXZmcTEzaSJ9.0P3twJVNh6_kCNzTwGv6TA&limit=1"

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect", undefined)
        } else if (body.features.length == 0) {
            callback("Unable to find results", undefined)
        } else  {
            const data = body.features[0]
            const lat = data.center[1]
            const lng = data.center[0]
            const location = data.place_name
            
            callback(undefined, {
                lat,
                lng,
                location
            })
        }
    })
}

module.exports = getGeocodeData