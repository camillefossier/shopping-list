import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Article } from '../../models/Models';
import { listStyles } from '../../styles/Styles';

type Props = {
  article: Article
}
export const ArticleItem = (props: Props) => {
  return (
    <View style={listStyles.item}>
      <Text style={styles.name}>{props.article.getName()}</Text>
      <Text style={styles.quantity}>{props.article.quantity}</Text>
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