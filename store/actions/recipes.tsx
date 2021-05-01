import { Recipe } from "../../models/Models";

export type RecipeAction = {
  type: string,
  recipe: Recipe
}

const CREATE_RECIPE = 'CREATE_RECIPE';

export const recipeActionTypes = {
  CREATE_RECIPE
}

export const createRecipe = (recipe: Recipe): RecipeAction => ({
  type: CREATE_RECIPE,
  recipe: recipe
})