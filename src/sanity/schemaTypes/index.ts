import { type SchemaTypeDefinition } from 'sanity'
import allProducts from './allproducts'
import products from './products'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products],
}
