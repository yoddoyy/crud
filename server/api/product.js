const express = require('express')
const bodyParser = require('body-parser')
const productCtrl = require('../controller/product')

const router = express.Router()

module.exports = router


router.get('/',[bodyParser.json()], productCtrl.getProduct)
router.post('/search',[bodyParser.json()], productCtrl.searchProduct)
router.put('/',[bodyParser.json()], productCtrl.addProduct)
router.post('/',[bodyParser.json()], productCtrl.updateProduct)
router.delete('/',[bodyParser.json()], productCtrl.delProduct)