const { Router } = require('express')
const router = Router();

const { addNewArticle, updateArticle, getArticleById, getAllArticlesByCityId, deleteArticleById } = require('../controllers/article')
const { isAuthenticated, isUserRoleAdmin } = require('../controllers/auth')

router.get('/all/:cityId', isAuthenticated, async (req, res) => {
    return await getAllArticlesByCityId(req, res);
})

router.get('/:id', isAuthenticated, async (req, res) => {
    return await getArticleById(req, res);
})

router.post('/create/:cityId', isAuthenticated, async (req, res) => {
    return await addNewArticle(req, res)
})

router.post('/update/:id', isAuthenticated, async (req, res) => {
    return await updateArticle(req, res);
})

router.delete('/delete/:cityId/:articleId', isAuthenticated/*, isUserRoleAdmin */, async (req, res) => {
    return await deleteArticleById(req, res);
})

module.exports = router;