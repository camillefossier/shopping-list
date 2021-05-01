import { Product } from "../../models/Models";

export type ProductAction = {
  type: string,
  product: Product
}

const CREATE_PRODUCT = 'CREATE_PRODUCT';

export const productActionTypes = {
  CREATE_PRODUCT
}

export const createProduct = (product: Product): ProductAction => ({
  type: CREATE_PRODUCT,
  product: product
})