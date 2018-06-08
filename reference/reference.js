var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_ref");
var Post = require("./models/post");
var User = require("./models/user");

// User.create({
//   emailAddress: "benfroelich@lit.com",
//   name: "benny the author!"
// });

Post.create({
  title: "content from module exports!",
  content: "some more content! bleep blorp blip blop!"
}, function(error, post) {
    if(error) console.log(error);
    else {
        User.findOne({name: "benny the author!"}, function(error, user) {
            if(error) console.log(error);
            else {
                user.posts.push(post);
                user.save(function(error, data) {
                    if(error) console.log(error);
                    else console.log(data);
            }
        });
    });
});

// newPost.save(function(error, post) {
//     if(error) {
//         console.log(error);
//     }
//     else {
//         console.log("created a post:");
//         console.log(post)
//     }
// });

// // find user and all their posts
// User.findOne({name: "benny the author!"}).populate("posts").exec(function(error, fullUserObject) {
//     if(error) console.log(error);
//     else console.log(fullUserObject);
// })