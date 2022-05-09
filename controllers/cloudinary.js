const { cloudinary } = require('../utils/cloudinary');

const uploads = async (image) => {
   const name = getImageName(image)
    try {
        const response = await cloudinary.uploader.upload(image, {
            public_id: `${name}`,
            overwrite: true
        })

        return response;
    } catch(err) {
        return null;
    }
}

const destroy = async (imageUrl) => {
    const name = getImageName(imageUrl)
    try {
        await cloudinary.uploader.destroy(`${name}`)
        return true
    } catch (err) {
        return false;
    }
}

const getImageName = (image) => {
    if(image.includes('http')){
        return image.slice(image.lastIndexOf('/') + 1, image.lastIndexOf('.'));
    }
    return image.slice(image.lastIndexOf('\\') + 1, image.lastIndexOf('.'));
}

module.exports = {
    uploads,
    destroy
}