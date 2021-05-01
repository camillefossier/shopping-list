import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../App';
import { Product, Recipe, Searchable, Shoppable } from '../models/Models';
import { SelectableProduct } from './SelectableProduct';
import { SelectableRecipe } from './SelectableRecipe';

function filterListByName<A extends Searchable>(list: Array<A>, value: string): Array<A> {
  return list.filter(a => a.getName().startsWith(value));
}

type Props = {
  onValidate?: (shoppable: Array<Shoppable>) => void
}

export const ShoppingListCreation = (props: Props) => {

  enum Tabs {
    PRODUCTS,
    RECIPES
  }

  const products = useSelector((state: RootState) => state.products.products);
  const recipes = useSelector((state: RootState) => state.recipes.recipes);

  const [selected, setSelected] = useState<Array<Shoppable>>([]);
  const [filteredProducts, setFilteredProducts] = useState<Array<Product>>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Array<Recipe>>([]);
  const [tab, setTab] = useState<Tabs>(Tabs.PRODUCTS);

  const filter = (val: string): void => {
    setFilteredProducts(filterListByName(Array.from(products.values()), val));
    setFilteredRecipes(filterListByName(Array.from(recipes.values()), val));
  }

  const select = (shoppable: Shoppable): void => {
    setSelected([...selected, shoppable]);
  }

  return (
    <View>
      <TextInput onChangeText={filter} />

      <View style={style.tabs}>
        <Button title="PRODUCTS" onPress={() => setTab(Tabs.PRODUCTS)} />
        <Button title="RECIPES" onPress={() => setTab(Tabs.RECIPES)} />
      </View>

      {tab === Tabs.PRODUCTS ?
        <View>
          <FlatList data={filteredProducts}
          renderItem={product => <SelectableProduct product={product.item} onSelect={select} />}
          keyExtractor={product => product.id.toString()} />
        </View>
        : <></>}

      {tab === Tabs.RECIPES ?
        <View>
          <FlatList data={filteredRecipes}
          renderItem={recipe => <SelectableRecipe recipe={recipe.item} onSelect={select} />}
          keyExtractor={recipe => recipe.id.toString()} />
        </View>
        : <></>}

      <Button title="VALIDATE LIST" onPress={() => props.onValidate?.(selected)} />
    </View>
  )
}

const style = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    flexWrap: 'nowrap',
    alignContent: 'stretch'
  }
})