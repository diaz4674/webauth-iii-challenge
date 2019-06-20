const express = require('express');
const server = (express());

const authProjectRouter = require('./users/users-router.js')

server.use(express.json())

server.use('/', authProjectRouter),

module.exports = server;