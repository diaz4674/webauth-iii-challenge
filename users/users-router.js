const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const router = require('express').Router()
const db = require('../data/dbConfig.js')
const Users = require('./users-helpers.js')

router.use(helmet())
router.use(express.json())
router.use(cors())

router.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = router;