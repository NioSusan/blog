const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
    },
    email : {
        type: String,
        unique: true,
        required : true
    },
    password : {
        type: String
    },
    role : {
        type: String,
        default: "user"
    },
    articles : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Article"
    }]
}, {timestamps:true});

//Remove articles related to users
userSchema.pre('remove', function(next){
    this.model('Article')
        .remove(
            {_id: {$in: this.articles}}
        )
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;