import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Recipe } from '../../models/Models';
import { listStyles } from '../../styles/Styles';

type Props = {
  recipe: Recipe,
  onPress?: (...args: any[]) => any
}

export const RecipeItem = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={listStyles.item}>
        <Text style={styles.mainText}>{props.recipe.getName()}</Text>
        <Text>{">"}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mainText: {
    flexGrow: 1
  }
})