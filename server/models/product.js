class Product {
   static get tableName() {
      return 'products'
   }

   static get jsonSchema() {
      return {
         type: 'object',
         required: [
            'order',
            'public',
            'slug',
            'title',
            'description',
            'stability',
            'shade',
            'packing',
            'colors',
            'sizes'
         ],
         properties: {
            id: { type: 'integer' },
            public: { type: 'boolean' },
            order: { type: ['integer', 'null'] },
            available_datetime: { type: ['string', 'null'], format: 'date-time'},
            slug: { type: 'string' },
            title: { type: 'string', maxLength: 255 },
            description: { type: 'string', maxLength: 1000 },
            stability: { type: 'integer' },
            shade: { type: 'integer' },
            florist_id: { type: 'integer' },
            florist_text: { type: 'string' },
            packing: {
               type: "array",
               items: { type: 'integer' },
               minItems: 1,
               uniqueItems: true
            },
            colors: {
               type: "array",
               items: { type: "integer" },
               minItems: 1,
               uniqueItems: true
            },
            additionalProducts: {
               type: "array",
               items: { type: "integer" },
               uniqueItems: true
            },
            sizes: {
               type: 'array',
               items: { type: 'object' },
               minItems: 1
            },

            // address: {
            //    type: 'object',
            //    properties: {
            //       street: { type: 'string' },
            //       city: { type: 'string' },
            //       zipCode: { type: 'string' }
            //    }
            // }
         }
      }
   }
}

module.exports = {
   Product
}