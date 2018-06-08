var mongoose = require("mongoose");
// user - email address and name
var userSchema = new mongoose.Schema({
    emailAddress: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});
module.exports = mongoose.model("User", userSchema);
