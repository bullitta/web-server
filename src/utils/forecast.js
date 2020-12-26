const request = require('request')
const forecast = (latitude, longitude, callback) => {
   url = 'http://api.weatherstack.com/current?access_key=c9bd8700a4f4e4321280935a680285b4&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body}) => {
        if (error) { callback('Unable to connect to weatherstack.com', undefined) }
        else if (body.error) { callback('Unable to find forecast', undefined) }
        else {
            const {weather_descriptions, temperature, feelslike} = body.current
            callback(undefined, weather_descriptions[0] +
                '. It is currently ' + temperature + ' degree out. It feels like '
                + feelslike + ' degree out')
        }
    })
}

module.exports = forecast