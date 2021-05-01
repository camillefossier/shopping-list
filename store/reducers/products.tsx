import { Product } from "../../models/Models";
import { ProductAction } from "../actions/products";
import { productActionTypes } from '../actions/products';

export type ProductsState = {
  nextProductId: number,
  products: Map<number, Product>
}
const a = new Map<number, string>([[1, "2"]])
const initialState: ProductsState = {
  nextProductId: 4,
  products: new Map<number, Product>([
    [1, new Product("Reblochon", 3, 1, 1)],
    [2, new Product("Lardons", 2, 200, 2)],
    [3, new Product("Lentilles vertes", 1.5, 500, 3)]
  ])
}

export const productsReducer = (state: ProductsState = initialState, action: ProductAction): ProductsState => {
  switch (action.type) {
    case productActionTypes.CREATE_PRODUCT:
      return {
        ...state,
        nextProductId: state.nextProductId + 1,
        products: state.products.set(state.nextProductId, new Product(action.product.name, action.product.price, action.product.quantity, state.nextProductId))
      }
  }
  return state;
}
