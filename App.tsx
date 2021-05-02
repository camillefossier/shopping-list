import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Recipes from './screens/Recipes';
import { containerStyles } from './styles/Styles';
import { createStore, combineReducers } from 'redux';
import { recipesReducer, RecipesState } from './store/reducers/recipes';
import { Provider } from 'react-redux';
import { productsReducer, ProductsState } from './store/reducers/products';
import { ShoppingListCreation } from './components/shoppingList/ShoppingListCreation';

export type RootState = {
  recipes: RecipesState,
  products: ProductsState
}
const rootReducer = combineReducers({
  recipes: recipesReducer,
  products: productsReducer
})
const store = createStore(rootReducer);

export default function App() {

  return (
    <Provider store={store}>
      <View style={{ ...styles.container, ...containerStyles.globalContainer }}>
        <ShoppingListCreation onValidate={console.log} />
        <Recipes />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: "stretch",
    justifyContent: "center",
  },
});
