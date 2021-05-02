import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Recipe } from '../../models/Models';
import { containerStyles } from '../../styles/Styles';
import { ArticleItem } from '../product/ArticleItem';

type Props = {
  recipe: Recipe
}

export const RecipeView = (props: Props) => {

  return (
    <View style={containerStyles.globalContainer}>
      <Text>{props.recipe.getName()}</Text>
      <FlatList data={props.recipe.articles}
        renderItem={article => <ArticleItem article={article.item} />}
        keyExtractor={article => article.item.getName()} />
    </View>
  )
}