//////////////  libraries  //////////////  
// built on the express framework MEN (mongo + express + node.js)
var express = require("express"),
    app = express();
// use embedded javascript for templating and generating pages
var ejs = require("ejs");
// use body parser to parse the form responses
var bodyParser = require('body-parser');
// use method-override to adhere to the REST pattern
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

//////////////  routes  //////////////  
// use mongoose to interact with the mongo database that stores campsites
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/RESTful-blog");
// set up the database schema
var blogSchema = new mongoose.Schema({
    title: {type: String, default: ""},
    imageUrl: {type: String, default: ""},
    content: {type: String, default: ""},
    publishDate: {type: Date, default: Date.now},
//    author: {type: String, default: "me"}
});
var Blog = mongoose.model("Blog", blogSchema);

// tell the express framework that we will use EJS templating
app.set("view engine", "ejs");
// tell the express framework that the css is in the public directory
app.use(express.static("public"));
app.use(express.static("semantic/dist"));
// use body parser to parse route query parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// start the app on the port and IP address provisioned by the host
app.listen(process.env.PORT, process.env.IP, function () {
    console.log("server is up n' runnin' for yer blog");
});

//////////////  routes  //////////////  
// default to the index route
app.get("/", function(request, response) {
   response.redirect("/blogs"); 
});
// index
app.get("/blogs", function(request, response) {
    // grab all the results from the blog database
    Blog.find(function(error, result) {
        if(error) {
            console.log(error);
            response.send("oh snap! failed to read from database" + error);
        }
        else {
            response.render("index", {blogs: result});
        }
    });
});
// new
app.get("/blogs/new", function(request, response) {
    response.render("new-blog");    
});
// create
app.post("/blogs", function(request, response) {
    // sanitize the user inputs
    request.body.blog.content = request.sanitize(request.body.blog.content);
    // add the new blog to the database
    Blog.create(request.body.blog, function (err, blog) {
        if(err) {
            console.log("failure saving " + blog.name + " to database");
            console.log(err);
        }  
        else {
            console.log("added to db:");
            console.log(blog);
            // redirect to the blogs get route
            response.redirect("blogs");          
        }
    });
  
});
// show
app.get("/blogs/:id", function(request, response) {
    var blogId = request.params.id;
    Blog.findById(blogId, function (error, blog) {
        if(error) {
            console.log(error);
            response.redirect("/blogs");
        }
        else {
            console.log("rendering the blog: ");
            console.log(blog);
            response.render("blog-detail", {blog: blog});
        }
    });
});
// edit
app.get("/blogs/:id/edit", function(request, response) {
    var blogId = request.params.id;
    Blog.findById(blogId, function (error, blog) {
        if(error) {
            console.log(error);
            response.redirect("/blogs");
        }
        else {
            console.log("editing the blog: ");
            console.log(blog);
            response.render("edit", {blog: blog});
        }
    });
});
// update
app.put("/blogs/:id", function(request, response) {
    var blogId = request.params.id;
    request.body.blog.content = request.sanitize(request.body.blog.content);
    Blog.findByIdAndUpdate(blogId, request.body.blog, function(err, originalBlog) {
        if(err) {
            response.redirect("/blogs");
        }
        else {
            response.redirect("/blogs/" + blogId);
        }
    });    
});
// destroy
app.delete("/blogs/:id", function(request, response) {
    // add the new blog to the database
    Blog.deleteOne({_id: request.params.id},
        function (err, blog) {
        if(err) {
          console.log("failure deleting " + blog.name + " from the database");
          console.log(err);
        }  
        else {
          console.log("deleted from db:");
          console.log(blog);
        }
    });
    // redirect to the blogs get route
    response.redirect("blogs");  
});