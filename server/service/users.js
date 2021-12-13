const userModel = require('../models/users')

const findUserByEmail = email => {
    const [isUser] = userModel.filter(user => user.email===email)
    return isUser.length === 0 ? false : isUser
}


module.exports = {
    findUserByEmail
}