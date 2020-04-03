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
            'circle',
            'price',
            'flowers',
            'images'
         ],
         properties: {
            id: { type: 'integer' },
            order: { type: ['integer', 'null'] },
            public: { type: 'boolean' },
            title: { type: 'integer' },
            circle: { type: 'integer' },
            price: { type: 'integer' },
            flowers: {
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