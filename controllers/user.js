const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userErrorHandler = require('../validations/user')
const User = require('../models/user')
const { JWT_PRIVATE_KEY } = require('../utils/variables')

const saveUser = async (req, res) => {
    const errors = await userErrorHandler(req)

    if (JSON.stringify(errors) !== JSON.stringify({})) { 
        return res.status(400).send(errors) 
    }

    const { firstName, lastName, email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
   
    let user;
    try {
        if(await User.find().countDocuments() === 0){
             user = new User({ firstName, lastName, email, password: hashedPassword, userRole: 'ADMIN' })
        } else {
             user = new User({ firstName, lastName, email, password: hashedPassword, userRole: 'USER' })        
        }

        const userObject = await user.save()

        const token = getToken({
            userId: userObject.id,
            firstName: firstName,
            role: user.userRole,
        }, new Date().getTime() + 863940000)
       
        return res.status(201).send({ 'accessToken': token, 'user': user });
    } catch (err) {
        errors['error'] = err
        return res.status(400).send(errors)
    }
}

const verifyUser = async (req, res) => {
    const { firstName, password } = req.body

    try {
        const user = await User.findOne({ firstName });  
        
        if (!user) { 
            return res.status(400).send({ message: 'Username or password is wrong.' }) 
        }

        const status = await bcrypt.compare(password, user.password)

        if (status) {
            const token = getToken({
                userId: user.id,
                firstName: firstName,
                role: user.userRole,
            }, new Date().getTime() + 863940000)

            return res.status(200).send({ 'accessToken': token, message: 'Successfully logged.' })
        }

        return res.status(400).send({ message: 'Username or password is wrong.' })
    } catch (err) {
        return res.status(400).send({ message: 'Username or password is wrong.' })
    }
}

const getToken = (data, expire) => {
    return jwt.sign(
        data,
        JWT_PRIVATE_KEY,
        { expiresIn: Number(expire) }
    );
}

module.exports = {
    saveUser,
    verifyUser
};