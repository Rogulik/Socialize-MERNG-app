const { AuthenticationError } = require('apollo-server')
require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (context) => {
    // context = {...headers}
    const authHeader = context.req.headers.authorization

    if(authHeader){
        //bearer ....
        const token = authHeader.split('Bearer ')[1]

        if(token){
            try {
                const user = jwt.verify(token, process.env.SECRET_TOKEN)
                return user
            } catch (error) {
                throw new AuthenticationError('Invalid/Expired token')
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]')
    }
    throw new Error('Authorization header must be provided')
}