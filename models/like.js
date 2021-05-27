const mongoose = require('mongoose')
//For ploymorphic relation

const likeSchema = mongoose.Schema({

    user:{
        type:mongoose.Schema.ObjectId
    },
    //this defines the object id of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:'onModel'//dynamic part
    },
    //this field is used to define the type of the liked object since this is dynamic reference sincce it a dunamic ref so we  don not define Scema.Types.ObjectId.
    //id post or command id
    onModel:{
        type:String,
        require:true,
        enum:['Post','Comment'] //For Post and Comment Model as like belong to both post and comment so ref is dynamic nothing other than post and comment have like.
        //type either post or comment
    }

});

const Like = mongoose.model('Like',likeSchema)
module.exports = Like