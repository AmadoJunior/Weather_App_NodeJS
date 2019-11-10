const request = require('request');

//Request Geocoding Function
const geoCode = (location, callback) => {

    const geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiYW1hZG9qdW5pb3IiLCJhIjoiY2syZHRrN2l5MDJnZjNpczE1OWFkcjkxcSJ9.YKqgvaGWxsAJyR6MBv5xGw&limit=1`

    request({ url: geoCodingUrl, json:true }, (error, response) => {
         if(error){

              callback("Unable to connect to location services",undefined);

         } else if (response.body.features.length == 0){

              callback("GeoCode cannot find location!",undefined); 

         } else { 

              const address = ({
                   placeName: response.body.features[0].place_name,
                   latitude: response.body.features[0].center[1],
                   longitude: response.body.features[0].center[0]
              })
              callback(undefined, address);

         }
    })

}

module.exports = geoCode;