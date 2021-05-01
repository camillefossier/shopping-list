import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Recipe, RecipeArticles } from "../models/Models";
import { listStyles } from "../styles/Styles";

type RecipeItemProps = {
    recipe: Recipe,
    onSelect?: (recipe: RecipeArticles) => void
  }

export const SelectableRecipe = (props: RecipeItemProps) => {

    enum SelectionMode {
      RECIPE,
      QUANTITY
    }
  
    const [selectionMode, setSelectionMode] = useState<SelectionMode>(SelectionMode.RECIPE);
    const [quantity, setQuantity] = useState(props.recipe.quantity);
  
    const validate = () => {
      setSelectionMode(SelectionMode.RECIPE);
      props.onSelect?.(new RecipeArticles(props.recipe, quantity));
    }
  
    return (
      <View>
        {selectionMode === SelectionMode.RECIPE ?
          <TouchableOpacity style={listStyles.item} onPress={() => setSelectionMode(SelectionMode.QUANTITY)}>
            <Text>{props.recipe.getName()}</Text>
          </TouchableOpacity>
          : <></>}
        {selectionMode === SelectionMode.QUANTITY ?
          <View style={listStyles.item}>
            <Text>Quantity: </Text>
            <TextInput keyboardType="number-pad" onChangeText={val => setQuantity(parseFloat(val))} />
            <Button title="CANCEL" color="red" onPress={() => setSelectionMode(SelectionMode.RECIPE)} />
            <Button title="ADD" onPress={validate} />
          </View>
          : <></>}
  
      </View>
    )
  }