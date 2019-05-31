const mongoose = require('mongoose');

const Items = mongoose.model('items', {
    itemName: {
    type: String
    },
    itemPrice:{
        type: String
    },
    itemDescription: {
    type: String
    },
    itemImage:{
        type:String
    }
   })
   module.exports = Items