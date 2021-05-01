import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Article } from '../models/Models';
import { listStyles } from '../styles/Styles';

type Props = {
  ingredient: Article
}
export const IngredientItem = (props: Props) => {
  return (
    <View style={listStyles.item}>
      <Text style={styles.name}>{props.ingredient.getName()}</Text>
      <Text style={styles.quantity}>{props.ingredient.quantity}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  name: {
    width: "75%"
  },
  quantity: {
    width: "25%"
  }
})