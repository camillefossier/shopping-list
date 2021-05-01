import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Recipe } from '../models/Models';
import { containerStyles } from '../styles/Styles';
import { IngredientItem } from './IngredientItem';

type Props = {
  recipe: Recipe
}

export const RecipeView = (props: Props) => {

  return (
    <View style={containerStyles.globalContainer}>
      <Text>{props.recipe.getName()}</Text>
      <FlatList data={props.recipe.ingredients}
        renderItem={ingredient => <IngredientItem ingredient={ingredient.item} />}
        keyExtractor={ingredient => ingredient.getName()} />
    </View>
  )
}