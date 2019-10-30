const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new mongoose.Schema({

//Place your Schema here

 });


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
