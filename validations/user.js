const User = require('../models/user')

module.exports = userErrorHandler = async (req) => {
    const { firstName, lastName, email, password, rePassword } = req.body

    let errors = {}

    const user = await User.findOne({ firstName })
    if (user) {
      errors['firstName'] = 'First Name already exist'
    }

    if(JSON.stringify(password) !== JSON.stringify(rePassword)){
        errors['rePassword'] = 'Passwords do not match'
    }

    return errors
}
