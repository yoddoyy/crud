const express = require('express')
const bodyParser = require('body-parser')
const categoryCtrl = require('../controller/category')

const router = express.Router()

module.exports = router


router.get('/',[bodyParser.json()], categoryCtrl.getCategory)
router.get('/getDropDown',[bodyParser.json()], categoryCtrl.getDropDown)
router.put('/',[bodyParser.json()], categoryCtrl.addCategory)
// router.put('/',[bodyParser.json()], productCtrl.testpost)
// router.delete('/',[bodyParser.json()], productCtrl.testpost)