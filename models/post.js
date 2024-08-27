const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Blogpost = new Schema ({
    title: String,
    detail: String,
    dateCreated: { type: Date, default:Date.now }
})

const Post = mongoose.model('Post', Blogpost)
module.exports = Post