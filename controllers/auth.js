const jwt = require('jsonwebtoken')
const { JWT_PRIVATE_KEY } = require('../utils/variables')

const isAuthenticated = (req, res, next) => {
    const token = req.headers['x-access-token']

    if (!token) { 
        return res.status(401).send({ message: 'You are not authenticared.' }) 
    }

    try {
        jwt.verify(token, JWT_PRIVATE_KEY)
        next()
    } catch (e) {
        return res.status(401).send({ message: 'You are not authenticared.' })
    }
}

const isUserRoleAdmin = (req, res, next) => {
    const token = req.headers['x-access-token']
    return jwt.verify(token, JWT_PRIVATE_KEY, (err, user) => {
        if(user.role === 'ADMIN'){
            next()
        } else {
            return res.status(405).send({ message: 'Not allowed.' })
        }
    })
}

const guestAccess = (req, res, next) => {
    const token = req.headers['x-access-token']
    if (token) { 
        return res.status(400).send({ message: 'You have already logged.' }) 
    }
    next()
}

module.exports = {
    isAuthenticated,
    guestAccess,
    isUserRoleAdmin
};
