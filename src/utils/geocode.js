const request = require ('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYnVsbGl0dGEiLCJhIjoiY2tpZnRrYmc1MWd2cTJ5cGVtcnZ4bXFhdSJ9.Sud7zJ6b1HrAGUem2lZ6-Q&limit=1'
    request({ url, json: true }, (error, { body}) => {
        if (error) { callback('Unable to connect to mapbox.com', undefined) }
        else if (body.features.length === 0) {callback ('Unable to geocode place', undefined) }
        else {
            const { center, place_name } = body.features[0]
            callback(undefined, {
                
                latitude: center[1],
                longitude: center[0],
                place: place_name
            } )}
         
    }) 
}
module.exports = geocode