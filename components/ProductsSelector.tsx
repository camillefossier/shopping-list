import React, { useState } from 'react';
import { Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import { Article, Product } from '../models/Models';
import { createProduct } from '../store/actions/products';
import { ProductsState } from '../store/reducers/products';
import { containerStyles, listStyles } from '../styles/Styles';
import { ProductCreation } from './ProductCreation';
import { SelectableProduct } from './SelectableProduct';

type Props = {
  initialSelection?: Array<Article>,
  onValidate?: (articles: Array<Article>) => void
}

type ArticleItemProps = {
  article: Article,
  onRemove?: (article: Article) => void
}

const SelectedArticle = (props: ArticleItemProps) => {
  return (
    <View style={listStyles.item}>
      <Text>{props.article.product.getName()}</Text>
      <Text>{props.article.quantity}</Text>
      <Button title="X" color="red" onPress={() => props.onRemove?.(props.article)} />
    </View>
  )
}

export const ProductsSelector = (props: Props) => {

  const products: Map<number, Product> = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  enum Modals {
    NONE,
    SELECTED_ARTICLES,
    NEW_PRODUCT
  }
  const [modal, setModal] = useState<Modals>(Modals.NONE);

  const [selectedArticles, setSelectedArticles] = useState<Array<Article>>(props.initialSelection || []);
  const selectedArticlesIds = new Set(selectedArticles.map(a => a.product.id));

  const remainingProducts = [...products.values()].filter(p => !selectedArticlesIds.has(p.id));

  const [filteredProducts, setFilteredProducts] = useState<Array<Product>>(remainingProducts);

  const selectArticle = (article: Article) => {
    if (selectedArticles.map(a => a.product.id).includes(article.product.id)) {
      setSelectedArticles([...selectedArticles.filter(a => a.product.id != article.product.id), article]);
    } else {
      setSelectedArticles([...selectedArticles, article]);
    }
  }

  const validateProduct = (product: Product) => {
    dispatch(createProduct(product));
    setModal(Modals.NONE);
  }

  return (
    <View style={{ ...containerStyles.globalContainer, height: "100%" }}>

      {/* Search bar */}
      <Text>Search</Text>
      <View style={styles.searchBar}>
        <TextInput onChangeText={(value) => setFilteredProducts(remainingProducts.filter(p => p.getName().startsWith(value)))} />
      </View>

      <Button title="New product" onPress={() => setModal(Modals.NEW_PRODUCT)} />

      {/* Available products */}
      <Text>Products</Text>
      <View style={styles.subContainer}>
        <FlatList data={filteredProducts}
          renderItem={(product) => <SelectableProduct product={product.item} onSelect={selectArticle} />}
          keyExtractor={product => product.id.toString()} />
      </View>

      <TouchableOpacity onPress={() => setModal(Modals.SELECTED_ARTICLES)}>
        <Text>{selectedArticles.length} articles</Text>
      </TouchableOpacity>

      <Modal visible={modal === Modals.SELECTED_ARTICLES}>
        {/* Selected articles */}
        <Text>Selected Articles</Text>
        <View>
          <Button title="Close" onPress={() => setModal(Modals.NONE)} />
          <FlatList data={selectedArticles}
            renderItem={(article) => <SelectedArticle article={article.item} onRemove={(article: Article) => setSelectedArticles(selectedArticles.filter(a => a.product.id !== article.product.id))} />}
            keyExtractor={article => article.product.id.toString()} />
        </View>
      </Modal>

      <Modal visible={modal === Modals.NEW_PRODUCT}>
        <ProductCreation onValidate={(product) => validateProduct(product)} />
      </Modal>

      <Button title="DONE" onPress={() => props.onValidate?.(selectedArticles)} />

    </View>
  )
}

const styles = StyleSheet.create({
  subContainer: {
    maxHeight: "50%",
    flexGrow: 1,
    borderColor: "black",
    borderWidth: 1,
    padding: 15
  },
  searchBar: {
    borderColor: "black",
    borderWidth: 1,
    padding: 5
  }
})
