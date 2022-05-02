const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, {message: 'Title is required'}],
        minLength: [5, 'Title should be at least 5 characters'],
        maxLength: [15, 'Title can not be more than 15 characters']
    },

    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [50, 'Description should be at least 50 characters']
    },

    imageUrl: {
        type: String,
        required: [true, 'Image is required']
    }
})

module.exports = mongoose.model('Article', ArticleSchema);
