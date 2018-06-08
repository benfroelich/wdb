var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

// post - title and content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

// user - email address and name
var userSchema = new mongoose.Schema({
    emailAddress: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

// var newUser = new User({
//   emailAddress: "benfroelich@lit.com",
//   name: "benny the author!"
// });
var user = User.findOne({
   name: "benny the author!" 
}, function(error, user) {
    if(error) {
        console.log(error);
    }
    else {
        console.log("found user: ");
        console.log(user);
        user.posts.push({
            title: "I'm becoming prolific!",
            content: "That's three posts in a day!"
        });
        user.save(function(error, user) {
            if(error) {
                console.log(error);
            }
            else {
                console.log("successfully added a post to user: ");
                console.log(user);
            }
        });
    }
});

// var newPost = new Post({
//   title: "some title!",
//   content: "some content, too! bleep blorp blip blop!"
// });

// newPost.save(function(error, post) {
//     if(error) {
//         console.log(error);
//     }
//     else {
//         console.log("created a post:");
//         console.log(post)
//     }
// });

