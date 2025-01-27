import { type SchemaTypeDefinition } from 'sanity'
import products from './products'
import cart from '../schemas/cart'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products , cart],
}
