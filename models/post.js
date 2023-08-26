/* Post mongoose model */
const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    username: String,
    content: String
});

const PostSchema = new mongoose.Schema({
    username: String,
    caption: String,
    destination: String,
    sightseeingLocation: String,
    likes: Number,
    rating: Number,
    // image: String,
    image_id: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    comments: [CommentSchema]
})

const Post = mongoose.model('Post', PostSchema)

module.exports = {Post}