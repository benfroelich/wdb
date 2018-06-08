var express = require("express");
var ejs = require("ejs");
var app = express();

// tell the express framework that we will use EJS templating
app.set("view engine", "ejs");
// tell the express framework that the css is in the public directory
app.use(express.static("public"));

app.get("/", function(request, response) {
    response.render("home"); 
});

app.get("/myFav/:favorite", function (request, response) {
    var data = {favorite: request.params.favorite};
    response.render("fav", data);
});

app.get("/posts/", function (request, response) {
    // a sample listing of posts for debugging
    // I think these would normally be stored in a database
    var posts = [
        {author: "Clark", title: "How to clean a mushroom"},
        {author: "Benny", title: "Unlocking your W123 steering wheel"},
        {author: "Sophia", title: "Something with no meaning to a \"lay\" person"}];    

    response.render("posts", {posts: posts});    
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("server is listening");
});