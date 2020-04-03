const express = require('express')
const router = express.Router()
const addtitionalProductsController = require('../controllers/addtitionalProducts')

router.route('/')
   .get(addtitionalProductsController.getAll)

router.route('/:id')
   .get(addtitionalProductsController.getOne)

module.exports = router