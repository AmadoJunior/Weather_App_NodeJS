const request = require('request');

//Requests Weather from Dark Sky API Function
const getWeather = (latitude, longitude, callback) => {
    const weatherUrl = `https://api.darksky.net/forecast/cdd623dde814f3b8aff1edfd9f514328/${latitude},${longitude}?units=us&exclude=flags`;

    request({ url: weatherUrl, json: true },(error, response) => {
         
         const weather = response.body;
         if(error){

              callback("Unable to connect to weather service!",undefined);

         } else if (response.body.error){

              callback("Unable to find location",undefined);
         
         } else 
         {
              const data = ({
                   summary: weather.daily.data[0].summary,
                   temperature: weather.currently.temperature,
                   probability: weather.currently.precipProbability
              })
              callback(undefined, data);
         }
    }
    )
}

module.exports = getWeather;