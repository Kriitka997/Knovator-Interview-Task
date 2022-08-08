const mongoose = require('mongoose');

const userData = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    user_email:{
        type: String,
        required: true
    },
    user_password:{
        type: String,
       
    },

},
    {timestamps:true
});

const postdata = mongoose.model('UserDetails',userData);


module.exports = postdata;