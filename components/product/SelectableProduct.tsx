import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Article, Product } from "../../models/Models";
import { listStyles } from "../../styles/Styles";

type ProductItemProps = {
    product: Product,
    onSelect?: (article: Article) => void
  }

export const SelectableProduct = (props: ProductItemProps) => {

    enum SelectionMode {
      ARTICLE,
      QUANTITY
    }
  
    const [selectionMode, setSelectionMode] = useState<SelectionMode>(SelectionMode.ARTICLE);
    const [quantity, setQuantity] = useState(props.product.quantity);
  
    const validate = () => {
      setSelectionMode(SelectionMode.ARTICLE);
      props.onSelect?.(new Article(props.product, quantity));
    }
  
    return (
      <View>
        {selectionMode === SelectionMode.ARTICLE ?
          <TouchableOpacity style={listStyles.item} onPress={() => setSelectionMode(SelectionMode.QUANTITY)}>
            <Text>{props.product.getName()}</Text>
          </TouchableOpacity>
          : <></>}
        {selectionMode === SelectionMode.QUANTITY ?
          <View style={listStyles.item}>
            <Text>Quantity: </Text>
            <TextInput keyboardType="number-pad" onChangeText={val => setQuantity(parseFloat(val))} />
            <Button title="CANCEL" color="red" onPress={() => setSelectionMode(SelectionMode.ARTICLE)} />
            <Button title="ADD" onPress={validate} />
          </View>
          : <></>}
  
      </View>
    )
  }