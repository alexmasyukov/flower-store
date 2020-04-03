const Ajv = require('ajv')
const ajv = Ajv({ allErrors: true, removeAdditional: 'all' })
const utils = require('../utils')

/**
 * Format error responses
 * @param  {Object} schemaErrors - array of json-schema errors, describing each validation failure
 * @return {String} formatted api response
 */
function errorResponse(schemaErrors) {
   let errors = schemaErrors.map((error) => {
      return {
         path: error.dataPath,
         message: error.message
      }
   })
   return {
      status: 'failed',
      errors: errors
   }
}

function validate(schema, body) {
   const valid = ajv.validate(schema, body)

   const res = {
      status: ''
   }

   if (!valid) {
      res.status = 'error'
      res.errors = errorResponse(ajv.errors)
      return res
   }

   return res
}

module.exports = {
   /**
    * Validates incoming request bodies against the given schema,
    * providing an error response when validation fails
    * @return {Object} response
    * @param schema
    */
   validateSchema(schema) {
      return (req, res, next) => {
         const valid = validate(schema, req.body)
         if (valid.status === 'error') {
            return res.status(500).send(valid.errors)
         }
         next()
      }
   },

   validateProductSizes(schema) {
      return (req, res, next) => {
         if (!('sizes' in req.body)) {
            return utils.error(500, 'ERROR', 'sizes not found in request body')
         }

         req.body.sizes.forEach(size => {
            const valid = validate(schema, size)
            if (valid.status === 'error') {
               return res.status(500).send(valid.errors)
            }
         })

         next()
      }
   }
}