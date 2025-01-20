const allProducts = {
    name: 'Products',
    title: 'Products',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Product Title',
        type: 'string',
        description: 'Name of the clothing item.',
      },
      {
        name: 'description',
        title: 'Product Description',
        type: 'text',
        description: 'Detailed description of the clothing item.',
       
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        description: 'Price of the product in USD.',

      },
      {
        name: 'discount',
        title: 'Discount Percentage',
        type: 'number',
        description: 'Discount percentage for the product (e.g., 10 for 10%).',
      
      },
      {
        name: 'quantity',
        title: 'Available Quantity',
        type: 'number',
        description: 'Number of items available in stock.',
       
      },
      {
        name: 'rating',
        title: 'Product Rating',
        type: 'number',
        description: 'Average rating of the product.',
      
      },
      {
        name: 'galleryImages',
        title: 'Gallery Images',
        type: 'array',
        description: 'Images of the product.',
        of: [{ type: 'image' }],
        options: {
          layout: 'grid'
        },
  
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string',
        description: 'Category of the product (e.g., mens, womens, kids).',
        options: {
          list: [
            { title: 'Mens', value: 'mens' },
            { title: 'Womens', value: 'womens' },
            { title: 'Kids', value: 'kids' },
          ], // Dropdown options
        },
      },
    ]
  };
  export default allProducts;