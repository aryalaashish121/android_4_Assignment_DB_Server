const mongoose = require('mongoose');

const User = mongoose.model('User', {
    fname: {
    type: String
    },
    lname:{
        type: String
    },
    username: {
    type: String
    },
    password:{
        type:String
    }
   })
   module.exports = User