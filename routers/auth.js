const { Router } = require('express')
const router = Router();

const { saveUser, verifyUser } = require('../controllers/user')
const { guestAccess } = require('../controllers/auth')

router.post('/signup', guestAccess, async (req, res) => {
    return await saveUser(req, res)
})

router.post('/signin', guestAccess, async (req, res) => {
    return await verifyUser(req, res);
})

module.exports = router;
