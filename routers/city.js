const { Router } = require('express')
const router = Router();

const { addNewCity, updateCity, getAllCities, deleteCityById } = require('../controllers/city')
const { isAuthenticated, isUserRoleAdmin } = require('../controllers/auth')

router.get('/all', isAuthenticated, async (req, res) => {
    return await getAllCities(req, res);
})

router.post('/create', isAuthenticated, async (req, res) => {
    return await addNewCity(req, res)
})

router.post('/update/:id', isAuthenticated, async (req, res) => {
    return await updateCity(req, res);
})

router.delete('/delete/:id', isAuthenticated/*, isUserRoleAdmin */, async (req, res) => {
    return await deleteCityById(req, res);
})

module.exports = router;