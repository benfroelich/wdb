var express = require('express');
var app = express();

app.get('/', function (request, response) {
    response.send('Hi there, welcome to my assignment!');
});

app.get('/speak/:animal', function (request, response) {
    var message;
    var animal = request.params.animal;
    // only these animal-noise pairs are registered and will generate pages
    var noises = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!"
    }
    var noise = noises[animal.toLowerCase()];
    // check if the animal is in the list, and generate the page if it is
    if(noise != undefined)
    {
        message = 'The ' + animal + " says \'" + noise + "\'";
        response.send(message);
    }
    else
        response.redirect('/error');
});

app.get('/repeat/:word/:numRepeats', function(request, response) {
    var message = ""; // will be sent to browser
    // parse the route
    var word = request.params.word; 
    var numRepeats = Number(request.params.numRepeats);
    // print word numRepeats times with spaces
    for(var i = 0; i < numRepeats; i++) {
        message += word;
        // add spaces between words, but not at the end of the string
        if( i < numRepeats - 1) message += ' ';
    }
    response.send(message);
});
app.get('/*', function (request, response) {
    response.send("oh peppermint schnapps!");
});

app.listen(process.env.PORT, process.env.IP, 
    function() {console.log("web server now running")});