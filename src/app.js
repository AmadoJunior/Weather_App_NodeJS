const path = require("path");           //This core module is used to join paths
const express = require("express");     //This npm module is used to set up our server
const hbs = require("hbs");             //Templating module
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/weather");


const app = express();

//Defining our absolute path strings using path.join and __dirname
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname , "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials") 

//Setting hbs as our view engine
app.set("view engine", "hbs")
//Setting the views files path location
app.set("views", viewsPath)
hbs.registerPartials(partialsPath);


//Setting up our static directory where we will put all of our static files using the absolute path string we just created
app.use(express.static(publicDirectoryPath)); 

//Rendering HandleBars dynamic pages
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Amado"
    })
})
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Amado"
    })
})
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Name"
    })
})

//Sending an object over to our server using geocode and forecast
app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error:"You must enter an address!"
        })
    }

    geoCode(req.query.address, (error, address) => {

        if(error){
            return res.send({
                error: error
            })
        } 

        forecast(address.latitude, address.longitude, (error, data) =>{

            if(error){
                return res.send({
                    error: error
                })
            }
            
            res.send({
                location: address.placeName,
                summary: `${data.summary} It is currently ${data.temperature} degrees out.
                There is a %${data.probability} change of rain.`
             })
             
         })
        
    } )

})

//404 Pages render

app.get("/help/*", (req, res) => {
    res.render("404", {
        title:"404",
        message:"Help article not found",
        name:"Amado"
    })
})

app.get("*", (req, res) => { //404 route should come last
    res.render("404",{
        title:"404",
        message:"Page not found",
        name:"Amado"
    })
})

//Putting server live on port 3000
app.listen(3000, () => {
    console.log("Server is up on port 3000.")
});

