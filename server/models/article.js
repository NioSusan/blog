const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true,
    },
    content : {
        type: String,
        required : true
    },
    image : {
        type: String
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
}, {timestamps:true});

articleSchema.pre('remove', function(next){
    console.log("from article's hook!")
    this.model(User)
        .update({_id: this.author}, {$pull:{articles: {_id:article.id}}})
    next()
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;