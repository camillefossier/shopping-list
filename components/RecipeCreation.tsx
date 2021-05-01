import React, { useState } from 'react';
import { Button, FlatList, Modal, Text, TextInput, View } from 'react-native';
import { Article, Product, Recipe } from '../models/Models';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe } from '../store/actions/recipes';
import { RootState } from '../App';
import { containerStyles } from '../styles/Styles';
import { ProductsSelector } from './ProductsSelector';

type Props = {
  onValidation?: () => void
}

enum Modals {
  NONE,
  ARTICLE_SELECTOR
}

export const RecipeCreation = (props: Props) => {

  const [name, setName] = useState("");
  const [articles, setArticles] = useState<Array<Article>>([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [modal, setModal] = useState<Modals>(Modals.NONE);
  const dispatch = useDispatch();

  const validateRecipe = () => {
    dispatch(createRecipe(new Recipe(name, articles, quantity)));
    props.onValidation?.();
  }

  const validateArticles = (articles: Array<Article>) => {
    setArticles(articles);
    setModal(Modals.NONE);
  }
  
  return (
    <View style={containerStyles.globalContainer}>
      <Text>Name</Text>
      <TextInput onChangeText={setName} />

      <FlatList data={articles}
        renderItem={article => <View><Text>{article.item.getName()} - {article.item.quantity}</Text></View>}
        keyExtractor={article => article.product.id.toString()}
      />

      <Text>Quantity</Text>
      <TextInput onChangeText={(value) => setQuantity(parseFloat(value))} />

      <Button title="Select articles" onPress={() => setModal(Modals.ARTICLE_SELECTOR)} />
      <Button title="VALIDATE RECIPE" onPress={validateRecipe} />

      <Modal visible={modal === Modals.ARTICLE_SELECTOR}>
        <ProductsSelector initialSelection={articles} onValidate={validateArticles} />
      </Modal>

    </View>
  )
}