var express = require('express');
var app = express();
console.log('loaded express framework');

// '/' -> 'Hi there'
app.get('/', function (request, response) {
    response.send('hi');
});
// '/bye' -> 'goodbye'
app.get('/bye', function (request, response) {
    response.send('bye-bye');
});
// '/dog' -> 'meow'
app.get('/dog', function (request, response) {
    console.log("dog route called");
    response.send('meow!');
});

app.listen(process.env.PORT, process.env.IP, 
    function() {console.log("web server now running")});