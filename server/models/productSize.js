class ProductSize {
   static get tableName() {
      return 'product_sizes'
   }

   static get jsonSchema() {
      return {
         type: 'object',
         required: [
            'order',
            'public',
            'title',
            'diameter',
            'price',
            'flowers_count',
            'images'
         ],
         properties: {
            id: { type: 'integer' },
            product_id: { type: 'integer' },
            order: { type: ['integer', 'null'] },
            public: { type: 'boolean' },
            title: { type: 'integer' },
            diameter: { type: 'integer' },
            price: { type: 'integer' },
            flowers_count: {
               type: "array",
               items: { type: 'integer' },
               minItems: 1,
               uniqueItems: true
            },
            images: {
               type: "array",
               items: { type: 'string' },
               minItems: 1
            }
         }
      }
   }
}

module.exports = {
   ProductSize
}