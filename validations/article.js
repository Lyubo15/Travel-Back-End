const Article = require('../models/article')

const articleErrorHandler = async (req) => {
    const { title, description, image } = req.body
    const id = req.params.id

    let errors = {}

    try {
        await Article.findById(id)
    } catch {
        errors['city'] = 'Article not found.'
    }
    
    const extension = image.slice(image.lastIndexOf('.'));
    if (extension !== '.png' && extension !== '.jpg' && extension !== '.jpeg'){
        errors['file'] = 'Image should be with png or jpg extension'
    }
    
    return errors
}

module.exports = {
    articleErrorHandler
}
