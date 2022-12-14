const mongoose = require('mongoose');

const userPost = new mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId, ref:'UserDetails'
    },
    Title:{
        type:String
    },
    Blog: {
        type: String
    }
    },
    {timestamps:true
});

//user table schema for storing the post which will create by user

let post = mongoose.model('postsbyuser', userPost);

module.exports = post;
