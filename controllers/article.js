const Article = require('../models/article')
const { articleErrorHandler } = require('../validations/article')
const { getAllCityArticles, addArticleToCity, removeArticleFromCity } = require('../controllers/city')

const addNewArticle = async (req, res) => {

    const errors = await articleErrorHandler(req)

    if (JSON.stringify(errors) !== JSON.stringify({})) { 
        return res.status(400).send(errors) 
    }

    const { title, description, image } = req.body
    const cityId = req.params.cityId

    // const response = await uploads(file, getFileName(image));

    // if (response === null) {
    //     return res.status(400).send({ message: 'Something went wrong during image uploading.' })
    // }

    try {
        const article = new Article({ title, description, imageUrl: image })
        const articlebject = await article.save()
        await addArticleToCity(cityId, articlebject.id)
        return res.status(201).send({ 'article': articlebject });
    } catch (err) {
        errors['error'] = err
        return res.status(400).send(errors)
    }
}

const getArticleById = async (req, res) => {
    try {
        const id = req.params.id
        const article = await Article.findById(id)
        return res.status(200).send({ 'article': article });
    } catch (err) {
        return res.status(400).send({ message: 'Article not found.' })
    }
}

const getAllArticlesByCityId = async (req, res) => {
    const cityId = req.params.cityId
    const articles = await getAllCityArticles(cityId)
    return res.status(200).send(articles);
}

const updateArticle = async (req, res) => {

    const errors = await articleErrorHandler(req)

    if (JSON.stringify(errors) !== JSON.stringify({})) {
        return res.status(400).send({ "error": errors })
    }

    const { title, description, image } = req.body;
    const id = req.params.id;
    
    let update = {};

    title && (update.title = title)
    description && (update.description = description)
    image && (update.imageUrl = image)

    try{
        const article = await Article.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        return res.status(200).send(article);
    } catch(err) {
        errors['err'] = err.message
        return res.status(400).send({ "error": errors })
    }
}

const deleteArticleById = async (req, res) => {
    const cityId = req.params.cityId;
    const articleId = req.params.articleId
    try {
        const article = await Article.findByIdAndDelete(articleId)
        //await destroy(getFileName(city.imageUrl));
        const result = await removeArticleFromCity(cityId, articleId)

        if (!result) {
            return res.status(400).send({ message: "Something went wrong." })
        }

        return res.status(200).send(article)
    } catch (_) {
        return res.status(400).send({ message: "Article not found." })
    }
}

module.exports = {
    addNewArticle,
    getArticleById,
    getAllArticlesByCityId,
    updateArticle,
    deleteArticleById
};