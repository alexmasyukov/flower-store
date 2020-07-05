const express = require('express')
const router = express.Router()
const commonController = require('../controllers/common')
const { Entitie } = require('../models/entities')
const {
  validateQuery,
  validateBody,
  validateParams
} = require('../middlewares/jsonSchemaValidator')
const checkAuth = require('../middlewares/checkAuth')

router.route('/')
  .get(
    validateQuery(Entitie.querySchema),
    commonController.getAll(Entitie.table, 'id', '', {})
  )
  .post(
    checkAuth,
    validateBody(Entitie.bodySchema),
    commonController.createOne(Entitie.table)
  )

router.route('/:id')
  .get(
    checkAuth,
    validateParams(Entitie.paramsSchema),
    validateQuery(Entitie.querySchema),
    commonController.getOne(Entitie.table, {})
  )
  .put(
    checkAuth,
    validateParams(Entitie.paramsSchema),
    validateBody(Entitie.updateSchema),
    commonController.updateOne(Entitie.table)
  )
  .delete(
    checkAuth,
    validateParams(Entitie.paramsSchema),
    commonController.deleteOne(Entitie.table)
  )

module.exports = router