const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const router = require('express').Router()
const db = require('../data/dbConfig.js')
const Users = require('./users-helpers.js')
const secrets = require('./config/secrets.js')
const jwt = require('jsonwebtoken')

const Authorization = require('../data/restricted-middleware')

router.use(helmet())
router.use(express.json())
router.use(cors())


generateToken = (user) => {
    return jwt.sign({
        userId: user.id,
    }, secrets.jwt, {
        expiresIn: '1h'
    })
}

router.post('/register', (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash

    Users.add(user)
    .then(saved => {
        const token = generateToken(saved)

        res.status(200).json({
            message: `Welcome ${user.username}`,
            token: token
        })
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.post('/login', (req, res) => {
    let {username, password} = req.body;
    
    Users.findBy({username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                
                const token = generateToken(user)
                    
                res.status(200).json({
                    message: `Welcome ${user.username}`,
                     token: token
                })
                
            } else {
                res.status(401).json({message: 'You Shall not pass!'})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})



router.get('/users', Authorization, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => res.send(err))
})


module.exports = router;