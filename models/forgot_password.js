const mongoose = require('mongoose');



const password_reset = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    token:{
        type:String
    },
    isValid:{
        type:Boolean
    }
}, {
    timestamps: true
});




const reset = mongoose.model('Reset', password_reset);

module.exports = reset;