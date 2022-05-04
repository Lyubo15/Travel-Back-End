const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');

const CitySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, {message: 'Name is required'}],
        minLength: [2, 'Name should be at least 2 characters']
    },

    country: {
        type: String,
        required: [true, 'Country is required'],
        minLength: [2, 'Country should be at least 2 characters']
    },

    imageUrl: {
        type: String,
        required: [true, 'Image is required']
    },

    isApproved: {
        type: Boolean,
        default: false
    },

    articles: [{
        type: ObjectId,
        ref: 'Article'
    }]
})

module.exports = mongoose.model('City', CitySchema);
