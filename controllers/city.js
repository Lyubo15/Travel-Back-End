const City = require('../models/city')
const { cityErrorHandler } = require('../validations/city')

const addNewCity = async (req, res) => {

    const errors = await cityErrorHandler(req)

    if (JSON.stringify(errors) !== JSON.stringify({})) { 
        return res.status(400).send(errors) 
    }

    const { name, country, image } = req.body

    // const response = await uploads(file, getFileName(image));

    // if (response === null) {
    //     return res.status(400).send({ message: 'Something went wrong during image uploading.' })
    // }

    try {
        const city = new City({ name, country, imageUrl: image })
        const cityObject = await city.save()
        
        return res.status(201).send({ 'city': cityObject });
    } catch (err) {
        errors['error'] = err
        return res.status(400).send(errors)
    }
}

const getCityById = async (id) => {
    try {
        const city = await City.findById(id)
        return city
    } catch (err) {
        return null
    }
}

const getAllCities = async (req, res) => {
    const cities = await City.find();
    return res.status(200).send(cities);
}

const updateCity = async (req, res) => {

    const errors = await cityErrorHandler(req)

    if (JSON.stringify(errors) !== JSON.stringify({})) {
        return res.status(400).send({ "error": errors })
    }

    const { name, country, image } = req.body;
    const id = req.params.id;
    
    let update = {};

    name && (update.name = name)
    country && (update.country = country)
    image && (update.imageUrl = image)

    try{
        const city = await City.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        return res.status(200).send(city);
    } catch(err) {
        errors['err'] = err.message
        return res.status(400).send({ "error": errors })
    }
}

const deleteCityById = async (req, res) => {
    const id = req.params.id;

    try {
        const city = await City.findByIdAndDelete(id)
        //await destroy(getFileName(city.imageUrl));
        return res.status(200).send(city)
    } catch (_) {
        return res.status(400).send({ "error": "City was not found." })
    }
}

module.exports = {
    addNewCity,
    getCityById,
    getAllCities,
    updateCity,
    deleteCityById
};