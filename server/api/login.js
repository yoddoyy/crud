const express = require('express')
const bodyParser = require('body-parser')
const loginCtrl = require('../controller/login')

const router = express.Router()

module.exports = router

router.post('/',[bodyParser.json()], loginCtrl.login)
router.put('/register',[bodyParser.json()], loginCtrl.register)
