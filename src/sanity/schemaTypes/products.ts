import { defineType } from "sanity"

export default defineType({
    name: 'products',
    title: 'Products',
    type: 'document',
    fields: [
        {
        name: 'name',
        title: 'Name',
        type: 'string',
        },
        {
        name: 'price',
        title: 'Price',
        type: 'number',
        },
        {
        name: 'description',
        title: 'Description',
        type: 'text',
        },
        {
        name: 'image',
        title: 'Image',
        type: 'image',
        },
        {
            name:"category",
            title:"Category",
            type: 'string',
            options:{
                list:[
                   {title: 'T-Shirt', value: 'tshirt'},
                   {title: 'Short', value: 'short'}, 
                   {title: 'Jeans', value: 'jeans'} ,
                   {title: 'Hoddie', value: 'hoodie'} ,
                   {title: 'Shirt', value: 'shirt'} ,
                ]
            }
        },
        {
            name:"discountPercent",
            title:"Discount Percent",
            type: 'number',
        },
        {
            name:"isNew",
            type: 'boolean',
            title:"isNew",
        },
        {
            name:"colors",
            title:"Colors",
            type: 'array',
            of:[
                {type: 'string'}
            ]
        },
        {
            name:"sizes",
            title:"Sizes",
            type: 'array',
            of:[
                {type: 'string'}
            ]
        },
        { // New fields
            name: 'wearfor', 
            title: 'Wearfor',
            type: 'string',
            options: {
              list: [
                { title: 'Men', value: 'men' },
                { title: 'Women', value: 'women' },
                { title: 'Kids', value: 'kids' },
              ],
            },
          },
          { 
            name: 'rating', 
            title: 'Rating',
            type: 'number',
          },
          { 
            name: 'Instock', 
            title: 'InStock',
            type: 'boolean',
          },
          { 
            name: 'stock', 
            title: 'Stock',
            type: 'number',
          },
          {
            name: "reviews",
            type: "array",
            title: "Reviews",
            of: [
              {
                type: "object",
                fields: [
                  { name: "name", type: "string", title: "Name" },
                  { name: "review", type: "text", title: "Review" },
                  { name: "rating", type: "number", title: "Rating" },
                  {
                    name: "datePosted",
                    type: "datetime", // Use "datetime" for storing dates and times
                    title: "Date Posted",
                  },
                ],
              },
            ],
          },
    ],
})