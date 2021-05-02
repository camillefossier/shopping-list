import React, { useState } from 'react';
import { Button, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Recipe } from '../models/Models';
import { RecipeItem } from '../components/recipe/RecipeItem';
import { RecipeView } from '../components/recipe/RecipeView';
import { connect, useDispatch, useSelector } from 'react-redux';
import { createRecipe } from '../store/actions/recipes';
import { RootState } from '../App';
import { RecipesState } from '../store/reducers/recipes';
import { RecipeCreation } from '../components/recipe/RecipeCreation';

enum modals {
  NONE,
  RECIPE_WINDOW,
  NEW_RECIPE
}

const Recipes = () => {

  const recipes: Map<number, Recipe> = useSelector((state: RootState) => state.recipes.recipes);

  const [currentModal, setCurrentModal] = useState<modals>(modals.NONE);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(new Recipe("", [], 0));

  const onRecipePressHandler = (recipeId: number) => {
    const pressedRecipe = (recipes.get(recipeId));
    if (pressedRecipe !== undefined) {
      setSelectedRecipe(pressedRecipe)
      setCurrentModal(modals.RECIPE_WINDOW);
    }
  };

  return (
    <>
      <View>
        <FlatList data={Array.from(recipes.values())}
          renderItem={recipe => <RecipeItem recipe={recipe.item} onPress={onRecipePressHandler.bind(this, recipe.item.id)} />}
          keyExtractor={item => item.id.toString()} />
      </View>

      <TouchableOpacity style={styles.newRecipe} onPress={() => setCurrentModal(modals.NEW_RECIPE)}>
        <Text style={styles.newRecipePlus}>+</Text>
      </TouchableOpacity>

      <Modal visible={currentModal === modals.RECIPE_WINDOW} animationType="slide">
        <RecipeView recipe={selectedRecipe} />
        <Button title="Close" onPress={() => setCurrentModal(modals.NONE)} />
      </Modal>

      <Modal visible={currentModal == modals.NEW_RECIPE} animationType="slide">
        <RecipeCreation onValidation={() => setCurrentModal(modals.NONE)} />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  newRecipe: {
    position: "absolute",
    bottom: 40,
    right: 40,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "orange",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  newRecipePlus: {
    fontSize: 50,
    color: "white"
  }
})

const mapStateToProps = (state: RecipesState) => {
  return {
    recipes: state.recipes
  };
}

export default connect(mapStateToProps)(Recipes);
