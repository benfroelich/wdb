var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var friends = ["tony", "phil collins", "bono"];

// tell express to use the body-parser library
app.use(bodyParser.urlencoded({extended: true}));
// tell the express framework that we will use EJS templating
app.set("view engine", "ejs");
// tell the express framework that the css is in the public directory
app.use(express.static("public"));

app.get("/", function(request, response) {
    response.render("home");
});

app.get("/friends", function(request, response) {
    response.render("friends", {friendList: friends});
});

app.post("/addFriend", function(request, response) {
    console.log(request.body);
    response.redirect("/friends");
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("server is up n' runnin'");
});