import { Recipe } from "../../models/Models";
import { recipeActionTypes, RecipeAction } from '../actions/recipes';

export type RecipesState = {
  nextRecipeId: number,
  recipes: Map<number, Recipe>
}

const initialState: RecipesState = {
  nextRecipeId: 1,
  recipes: new Map<number, Recipe>()
}

export const recipesReducer = (state: RecipesState = initialState, action: RecipeAction): RecipesState => {
  switch (action.type) {
    case recipeActionTypes.CREATE_RECIPE:
      return {
        ...state,
        nextRecipeId: state.nextRecipeId + 1,
        recipes: state.recipes.set(state.nextRecipeId, new Recipe(action.recipe.name, action.recipe.ingredients, state.nextRecipeId))
      }
  }
  return state;
}
