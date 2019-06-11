const bcrypt = require('bcryptjs')
const secrets = require('../users/config/secrets.js')
const Users = require('../users/users-helpers.js')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secrets.jwt, (err, payload) => {
            if(err){
                res.status(403).json({message: 'You shall not pass!'})
            } else {
                req.userId = payload.userId
                next()
            }
        })
    } else {
        res.status(400).json({message: 'No creds provided'})
    }

}