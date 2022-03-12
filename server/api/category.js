const express = require('express')
const bodyParser = require('body-parser')
const categoryCtrl = require('../controller/category')

const router = express.Router()

module.exports = router


router.get('/',[bodyParser.json()], categoryCtrl.getCategory)
router.post('/search',[bodyParser.json()], categoryCtrl.searchCategory)
router.get('/getDropDown',[bodyParser.json()], categoryCtrl.getDropDown)
router.put('/',[bodyParser.json()], categoryCtrl.addCategory)
router.post('/',[bodyParser.json()], categoryCtrl.updateCategory)
router.delete('/',[bodyParser.json()], categoryCtrl.delCategory)