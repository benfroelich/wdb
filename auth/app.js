var express                 = require("express"),
    User                    = require(__dirname + "/models/user"),
    mongoose                = require("mongoose"),
    bodyParser              = require("body-parser"),
    passport                = require("passport"),
    passportLocalStrategy   = require("passport-local"),
    pasportLocalMongoose    = require("passport-local-mongoose");
    
mongoose.connect("mongodb://localhost/auth_demo_app");
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
   secret: "i-heart-pakittie",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

////////////////////ROUTES/////////////////////
app.get("/", function(request, response) {
   response.render("home"); 
});

app.get("/secret", isLoggedIn, function(request, response) {
    response.render("secret"); 
});

////////////////////AUTH ROUTES/////////////////////

app.get("/register", function(request, response) {
   console.log("register get");
   response.render("register"); 
});

app.post("/register", function(request, response) {
   console.log("register post with");
   console.log(request.body.username);
   User.register(new User({username: request.body.username}), request.body.password, 
   function(error, user) {
       if(error) {
           console.log(error);
           response.redirect("/");
       }
       else {
           passport.authenticate("local")(request, response, function() {
              response.redirect("/secret"); 
           });
       }
   });
});

//////login routes//////
// render the login form
app.get("/login", function(request, response) {
   response.render("login");
});

app.post("/login", passport.authenticate("local", {
        successRedirect: "/secret",
        failureRedirect: "/login"
    }), 
    // everything is handled by the middleware, including rerouting
    function(request, response) {});


app.get("/logout", function(request, response) {
    request.logout();
    response.redirect("/");
});

function isLoggedIn(request, response, next) {
    if(request.isAuthenticated() === true) {
        return next();
    }
    response.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
}); 

