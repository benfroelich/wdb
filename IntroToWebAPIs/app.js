var express = require("express");
var app = express();
var request = require("request");
var ejs = require("ejs");
var temperature = "loading";
var filmList = temperature;

// tell the express framework that we will use EJS templating
app.set("view engine", "ejs");

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("server is up n' runnin' fer dem movies");
});

app.get("/weather", function(request, response) {
    response.send("temperature is " + temperature);
});

app.get("/", function(request, response) {
    response.render("home");
});

app.get("/movies", function(routeRequest, routeResponse) {
    var searchTerm = routeRequest.query.searchTerm;
    var searchUrl = "http://www.omdbapi.com/?s=" + searchTerm + "&apikey=thewdb"
    request(searchUrl, function (error, APIResponse, body) {
        if(!error && APIResponse.statusCode == 200) {
            var searchResponse = JSON.parse(body);
            if(searchResponse.Response != "False") {
                routeResponse.render("movies", {searchResult: searchResponse}); 
            }
            else {
                routeResponse.send("bad search term. Go back please.")
            }
        }
    });
});

// sample request
request("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%2293060%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function (error, response, body) {
    if(!error && response.statusCode == 200) {
        //console.log(body);
        var parsedData = JSON.parse(body);
        var report = parsedData.query.results.channel;
        var currentWeather = report.item.condition;
        console.log(parsedData.query.results.channel.title);
        console.log(currentWeather.temp + " and " + currentWeather.text);
        temperature = currentWeather.temp;
    }
});