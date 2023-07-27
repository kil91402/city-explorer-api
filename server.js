
const express = require("express");

const data = require("./data/weather.json");

const app = express();


app.get("/", (request, response) => {
    response.send("Hello World");
});

app.get("/weather", (request,response) => {
    response.send(data);
})

app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});


    
