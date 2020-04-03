const express = require('express')
const router = express.Router()
const citiesController = require('../controllers/cities')

router.route('/')
   .get(citiesController.getAllCities)

router.route('/:id')
   .get(citiesController.getCity)

module.exports = router