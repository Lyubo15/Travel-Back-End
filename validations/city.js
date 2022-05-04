const City = require('../models/city')

const cityErrorHandler = async (req) => {
    const { name, country, image } = req.body
    const id = req.params.id

    let errors = {}

    try {
        await City.findById(id)
    } catch {
        errors['city'] = 'City was not found.'
    }
    
    let city = await City.findOne({ name })
    if (city) {
      errors['name'] = 'City already exist.'
    }

    const extension = image.slice(image.lastIndexOf('.'));
    if (extension !== '.png' && extension !== '.jpg'){
        errors['file'] = 'Image should be with png or jpg extension'
    }
    
    return errors
}

module.exports = {
    cityErrorHandler
}
